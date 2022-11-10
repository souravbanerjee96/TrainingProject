using CustomerServiceReq.Controllers;
using CustomerServices.Controllers;
using CustomerServices.Models;
using CustomerUsers.Models;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using RestSharp;
using System.Collections;
using System.Net;

namespace CustomerServiceTest
{
    class ServiceResolutionTest
    {
        ServiceResolutionController serviceResolutionController;

        public ServiceResolutionTest()
        {
            serviceResolutionController = new ServiceResolutionController();
        }
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void GetResolution_ServiceTest()
        {
            dynamic result = serviceResolutionController.GetRequests();
            Assert.IsNotNull(result);
        }
        [Test]
        public void UpdateResolution_ServiceTest()
        {
            resolution sr = new resolution
            {
                Comment = "Test",
                Status = "X"
            };
            dynamic result = serviceResolutionController.UpdateRequest(sr);
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }
        [Test]
        public void UpdateUserComment_ServiceTest()
        {
            userComment sr = new userComment
            {
                UserComment = "Test",
                Status = "X"
            };
            dynamic result = serviceResolutionController.UpdateUserComment(sr);
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

    }
}
