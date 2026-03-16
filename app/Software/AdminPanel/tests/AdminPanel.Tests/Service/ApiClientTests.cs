using AdminPanel.SRC.Service;
using NUnit.Framework;

namespace AdminPanel.Tests.Services;

[TestFixture]
public class ApiClientTests
{
    [Test]
    public void NormalizeImageUrl_Null_ReturnsNull()
    {
        var result = ApiClient.NormalizeImageUrl(null);

        Assert.That(result, Is.Null);
    }

    [Test]
    public void NormalizeImageUrl_Whitespace_ReturnsNull()
    {
        var result = ApiClient.NormalizeImageUrl("   ");

        Assert.That(result, Is.Null);
    }

    [Test]
    public void NormalizeImageUrl_TripleSlashHttp_FixesUrl()
    {
        var result = ApiClient.NormalizeImageUrl("http:///mihirunk.hu/cloud/test.png");

        Assert.That(result, Is.EqualTo("http://mihirunk.hu/cloud/test.png"));
    }

    [Test]
    public void NormalizeImageUrl_TripleSlashHttps_FixesUrl()
    {
        var result = ApiClient.NormalizeImageUrl("https:///mihirunk.hu/cloud/test.png");

        Assert.That(result, Is.EqualTo("https://mihirunk.hu/cloud/test.png"));
    }

    [Test]
    public void NormalizeImageUrl_AbsoluteHttp_ReturnsSameUrl()
    {
        var result = ApiClient.NormalizeImageUrl("http://mihirunk.hu/dpfp.png");

        Assert.That(result, Is.EqualTo("http://mihirunk.hu/dpfp.png"));
    }

    [Test]
    public void NormalizeImageUrl_AbsoluteHttps_ReturnsSameUrl()
    {
        var result = ApiClient.NormalizeImageUrl("https://mihirunk.hu/cloud/test.png");

        Assert.That(result, Is.EqualTo("https://mihirunk.hu/cloud/test.png"));
    }

    [Test]
    public void NormalizeImageUrl_RelativeRootPath_BuildsAbsoluteUrl()
    {
        var result = ApiClient.NormalizeImageUrl("/dpfp.png");

        Assert.That(result, Is.EqualTo("https://mihirunk.hu/dpfp.png"));
    }

    [Test]
    public void NormalizeImageUrl_RelativeCloudPath_BuildsAbsoluteUrl()
    {
        var result = ApiClient.NormalizeImageUrl("/cloud/test.png");

        Assert.That(result, Is.EqualTo("https://mihirunk.hu/cloud/test.png"));
    }

    [Test]
    public void NormalizeImageUrl_PathWithoutLeadingSlash_BuildsAbsoluteUrl()
    {
        var result = ApiClient.NormalizeImageUrl("cloud/test.png");

        Assert.That(result, Is.EqualTo("https://mihirunk.hu/cloud/test.png"));
    }
}