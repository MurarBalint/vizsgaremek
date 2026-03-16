using System.Net;
using System.Net.Http;
using System.Text;
using AdminPanel.SRC.Model;
using AdminPanel.SRC.Service;
using AdminPanel.Tests.Helpers;
using NUnit.Framework;

namespace AdminPanel.Tests.Services;

[TestFixture]
public class ApiServicesTests
{
    private static HttpClient CreateClient(HttpMessageHandler handler)
    {
        return new HttpClient(handler)
        {
            BaseAddress = new Uri("http://localhost/")
        };
    }

    private static T CreateServiceWithClient<T>(HttpClient client) where T : class
    {
        var service = ReflectionHelper.CreateWithoutConstructor<T>();
        ReflectionHelper.SetPrivateField(service, "_httpClient", client);
        return service;
    }

    [Test]
    public async Task AuthApiService_LoginAsAdminAsync_ReturnsToken_OnSuccess()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.OK, """{"token":"abc123"}"""));
        });

        var service = CreateServiceWithClient<AuthApiService>(CreateClient(handler));

        var result = await service.LoginAsAdminAsync("admin", "secret");

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Token, Is.EqualTo("abc123"));
        Assert.That(handler.LastRequest, Is.Not.Null);
        Assert.That(handler.LastRequest!.Method, Is.EqualTo(HttpMethod.Post));
        Assert.That(handler.LastRequest!.RequestUri!.ToString(), Does.Contain("api/auth/login/admin"));
    }

    [Test]
    public void AuthApiService_LoginAsAdminAsync_ThrowsApiMessage_OnFailure()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.Unauthorized, """{"message":"Hibás belépés"}"""));
        });

        var service = CreateServiceWithClient<AuthApiService>(CreateClient(handler));

        var ex = Assert.ThrowsAsync<Exception>(async () =>
            await service.LoginAsAdminAsync("admin", "wrong"));

        Assert.That(ex!.Message, Is.EqualTo("Hibás belépés"));
    }

    [Test]
    public void AdminApiService_GetAdminsAsync_ThrowsFallbackMessage_WhenErrorBodyDoesNotContainMessage()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.InternalServerError, """{}"""));
        });

        var service = CreateServiceWithClient<AdminApiService>(CreateClient(handler));

        var ex = Assert.ThrowsAsync<Exception>(async () => await service.GetAdminsAsync());

        Assert.That(ex!.Message, Is.EqualTo("Nem sikerült lekérni az adminokat."));
    }

    [Test]
    public async Task AdminApiService_GetAdminInfoAsync_ReturnsData_OnSuccess()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.OK, """{"users":12,"posts":34,"ads":5}"""));
        });

        var service = CreateServiceWithClient<AdminApiService>(CreateClient(handler));

        var result = await service.GetAdminInfoAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.users, Is.EqualTo(12));
        Assert.That(result.posts, Is.EqualTo(34));
        Assert.That(result.ads, Is.EqualTo(5));
    }

    [Test]
    public async Task UserApiService_UpdateProfileAsync_SendsDefaultBirthDate_WhenInputIsEmpty()
    {
        string? body = null;

        var handler = new StubHttpMessageHandler(async (request, _) =>
        {
            body = request.Content is null
                ? null
                : await request.Content.ReadAsStringAsync();

            return StubHttpMessageHandler.Json(HttpStatusCode.OK, """{}""");
        });

        var service = CreateServiceWithClient<UserApiService>(CreateClient(handler));

        await service.UpdateProfileAsync(
            5,
            "Teszt",
            "Elek",
            "",
            "Budapest",
            "ELTE",
            "Bio",
            "/dpfp.png");

        Assert.That(handler.LastRequest, Is.Not.Null);
        Assert.That(handler.LastRequest!.Method.Method, Is.EqualTo("PATCH"));
        Assert.That(handler.LastRequest!.RequestUri!.ToString(), Does.Contain("api/profiles/5"));
        Assert.That(body, Does.Contain(@"""birth_date"":""0000-00-00"""));
        Assert.That(body, Does.Contain(@"""avatar_url"":""/dpfp.png"""));
    }

    [Test]
    public void UserApiService_DeleteUserAsync_ThrowsApiMessage_OnFailure()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.BadRequest, """{"message":"Nem törölhető"}"""));
        });

        var service = CreateServiceWithClient<UserApiService>(CreateClient(handler));

        var ex = Assert.ThrowsAsync<Exception>(async () => await service.DeleteUserAsync(99));

        Assert.That(ex!.Message, Is.EqualTo("Nem törölhető"));
    }

    [Test]
    public async Task PostApiService_GetCommentsForPostAsync_ReturnsComments_OnSuccess()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(
                    HttpStatusCode.OK,
                    """[{"id":1,"comment":"Első"},{"id":2,"comment":"Második"}]"""));
        });

        var service = CreateServiceWithClient<PostApiService>(CreateClient(handler));

        var result = await service.GetCommentsForPostAsync(10);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Count, Is.EqualTo(2));
        Assert.That(result[0].comment, Is.EqualTo("Első"));
        Assert.That(handler.LastRequest!.RequestUri!.ToString(), Does.Contain("api/comments/postComments/10"));
    }

    [Test]
    public void PostApiService_DeleteCommentAsync_ThrowsFallbackMessage_WhenBodyIsEmptyObject()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.InternalServerError, """{}"""));
        });

        var service = CreateServiceWithClient<PostApiService>(CreateClient(handler));

        var ex = Assert.ThrowsAsync<Exception>(async () => await service.DeleteCommentAsync(3));

        Assert.That(ex!.Message, Is.EqualTo("Nem sikerült törölni a kommentet."));
    }

    [Test]
    public async Task AdvertisementApiService_CreateAdvertisementAsync_SendsMultipartWithoutImage_WhenFileDoesNotExist()
    {
        string? body = null;
        string? mediaType = null;

        var handler = new StubHttpMessageHandler(async (request, _) =>
        {
            mediaType = request.Content?.Headers.ContentType?.MediaType;
            body = request.Content is null
                ? null
                : await request.Content.ReadAsStringAsync();

            return StubHttpMessageHandler.Json(HttpStatusCode.OK, """{}""");
        });

        var service = CreateServiceWithClient<AdvertisementApiService>(CreateClient(handler));

        await service.CreateAdvertisementAsync("Nike", "Shoes", @"C:\nincs-ilyen-file.png");

        Assert.That(handler.LastRequest, Is.Not.Null);
        Assert.That(handler.LastRequest!.Method, Is.EqualTo(HttpMethod.Post));
        Assert.That(handler.LastRequest!.RequestUri!.ToString(), Does.Contain("api/advertisement"));
        Assert.That(mediaType, Is.EqualTo("multipart/form-data"));
        Assert.That(body, Does.Contain("Nike"));
        Assert.That(body, Does.Contain("Shoes"));
    }

    [Test]
    public void AdvertisementApiService_CreateAdvertisementAsync_ThrowsApiMessage_OnFailure()
    {
        var handler = new StubHttpMessageHandler((request, _) =>
        {
            return Task.FromResult(
                StubHttpMessageHandler.Json(HttpStatusCode.BadRequest, """{"message":"Hiányzó adatok"}"""));
        });

        var service = CreateServiceWithClient<AdvertisementApiService>(CreateClient(handler));

        var ex = Assert.ThrowsAsync<Exception>(async () =>
            await service.CreateAdvertisementAsync("Nike", "Shoes", null));

        Assert.That(ex!.Message, Is.EqualTo("Hiányzó adatok"));
    }
}