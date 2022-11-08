using CustomerServiceReq.Controllers;
using CustomerUsers.Models;
using Microsoft.Extensions.Configuration;
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
            Assert.That(result[0].ServiceType, Is.EqualTo("Technology"));
        }

    }
}
