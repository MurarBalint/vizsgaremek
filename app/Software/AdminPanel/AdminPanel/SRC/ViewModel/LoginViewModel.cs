using AdminPanel.SRC.Service;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace AdminPanel.SRC.ViewModel
{
    public class ServerConfig
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public ServerConfig(string name, string url)
        {
            Name = name;
            Url = url;
        }

        public override string ToString() => Name;
    }

    public class LoginViewModel : ViewModelBase
    {
        //Fields
        private string _username;
        private SecureString _password;
        private string _errorMessage;
        private bool _isViewVisible = true;
        private ServerConfig _selectedServer;

        private readonly AuthApiService _authApiService;
        public ObservableCollection<ServerConfig> AvailableServers { get; }

        //Properties
        public string Username
        {
            get => _username;
            set
            {
                _username = value;
                OnPropertyChanged(nameof(Username));
            }
        }

        public SecureString Password
        {
            get => _password;
            set
            {
                _password = value;
                OnPropertyChanged(nameof(Password));
            }
        }

        public string ErrorMessage
        {
            get => _errorMessage;
            set
            {
                _errorMessage = value;
                OnPropertyChanged(nameof(ErrorMessage));
            }
        }

        public bool IsViewVisible
        {
            get => _isViewVisible;
            set
            {
                _isViewVisible = value;
                OnPropertyChanged(nameof(IsViewVisible));
            }
        }

        public ServerConfig SelectedServer
        {
            get => _selectedServer;
            set
            {
                _selectedServer = value;
                if (value != null)
                {
                    ApiClient.SetBaseAddress(value.Url);
                }
                OnPropertyChanged(nameof(SelectedServer));
            }
        }

        //-> Commands
        public ICommand LoginCommand { get; }

        //Constructor
        public LoginViewModel()
        {
            _username = string.Empty;
            _password = new SecureString();
            _errorMessage = string.Empty;

            // Initialize servers
            AvailableServers = new ObservableCollection<ServerConfig>
            {
                new ServerConfig("Mihirunk.hu", "https://mihirunk.hu"),
                new ServerConfig("Fejlesztői", "http://localhost:6769")
            };

            // Set default server
            _selectedServer = AvailableServers[0];
            ApiClient.SetBaseAddress(_selectedServer.Url);

            _authApiService = new AuthApiService();
            LoginCommand = new ViewModelCommand(async (o) => await ExecuteLoginCommand(), CanExecuteLoginCommand);
        }

        private bool CanExecuteLoginCommand(object obj)
        {
            return !string.IsNullOrWhiteSpace(Username)
                   && Username.Length >= 3
                   && Password != null
                   && Password.Length >= 3
                   && SelectedServer != null;
        }

        private async System.Threading.Tasks.Task ExecuteLoginCommand()
        {
            try
            {
                ErrorMessage = string.Empty;

                string plainPassword = ConvertToUnsecureString(Password);

                var result = await _authApiService.LoginAsAdminAsync(Username, plainPassword);

                if (result != null && !string.IsNullOrWhiteSpace(result.Token))
                {
                    MessageBox.Show("Sikeres bejelentkezés!");
                    IsViewVisible = false;
                }
                else
                {
                    ErrorMessage = "Sikertelen bejelentkezés.";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }

        private string ConvertToUnsecureString(SecureString securePassword)
        {
            if (securePassword == null || securePassword.Length == 0)
                return string.Empty;

            IntPtr unmanagedString = IntPtr.Zero;

            try
            {
                unmanagedString = Marshal.SecureStringToGlobalAllocUnicode(securePassword);
                return Marshal.PtrToStringUni(unmanagedString) ?? string.Empty;
            }
            finally
            {
                Marshal.ZeroFreeGlobalAllocUnicode(unmanagedString);
            }
        }
    }
}
