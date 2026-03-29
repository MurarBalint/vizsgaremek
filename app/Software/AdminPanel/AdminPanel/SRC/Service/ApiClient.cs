using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AdminPanel.SRC.Service
{
    public static class ApiClient
    {
        private static readonly CookieContainer _cookieContainer = new();

        private static readonly HttpClientHandler _handler = new()
        {
            UseCookies = true,
            CookieContainer = _cookieContainer
        };

        public static HttpClient Client { get; } = new HttpClient(_handler);

        static ApiClient()
        {
            Client.BaseAddress = new Uri("http://217.76.61.147");
        }

        public static void SetBaseAddress(string url)
        {
            Client.BaseAddress = new Uri(url);
        }

        public static string? NormalizeImageUrl(string? url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return null;

            url = url.Trim();

            if (url.StartsWith("http:///", StringComparison.OrdinalIgnoreCase))
                url = "http://" + url.Substring("http:///".Length);

            if (url.StartsWith("https:///", StringComparison.OrdinalIgnoreCase))
                url = "https://" + url.Substring("https:///".Length);

            if (url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                url.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
                return url;

            if (url.StartsWith("/", StringComparison.OrdinalIgnoreCase))
                return $"https://mihirunk.hu{url}";

            return $"https://mihirunk.hu/{url}";
        }
    }
}
