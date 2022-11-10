using CustomerServiceReq.Controllers;
using CustomerServices.Models;
using NUnit.Framework;
using RestSharp;
using System.Collections;
using System.Net;

namespace CustomerServiceTest
{
    public class ServiceRequestTest
    {
        ServiceReqController serviceReqController;

        public ServiceRequestTest()
        {
            serviceReqController = new ServiceReqController();
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void GetRequest_byID_Content_Check()
        {
            int id = 4;
            dynamic result = serviceReqController.Get(id);
            Assert.IsNotNull(result[0]);
        }
        [Test]
        public void PostRequest_check()
        {
            ServiceRequest sr = new ServiceRequest
            {
                ServiceName = "testService",
                ServiceType = "Test"
            };
            dynamic result = serviceReqController.Post(sr);
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public void UpdateRequestCheck_with_InvalidID()
        {
            ServiceRequest sr = new ServiceRequest
            {
                ServiceName = "testService",
                ServiceType = "Test"
            };
            dynamic result = serviceReqController.UpdateReq(99,sr);
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }
        [Test]
        public void DeleteRequestCheck_with_InvalidID()
        {
            dynamic result = serviceReqController.DeleteReq(9999);
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

    }
}
