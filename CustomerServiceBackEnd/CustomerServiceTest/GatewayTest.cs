using CustomerServiceReq.Controllers;
using CustomerServices.Models;
using Gateway.Controllers;
using Microsoft.Extensions.Logging;
using NUnit.Framework;
using RestSharp;
using System;
using System.Collections;
using System.Net;

namespace CustomerServiceTest
{
    class GatewayTest
    {
        HomeController homeController;
        ILogger<HomeController> logger;
        public GatewayTest()
        {
            homeController = new HomeController(logger);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Gateway_Test()
        {
            dynamic result = homeController.Index();
            Assert.IsNotNull(result);
        }
        [Test]
        public void Gateway_Privacy_Test()
        {
            dynamic result = homeController.Privacy();
            Assert.IsNotNull(result);
        }
        [Test]
        public void  Gateway_Error_Test()
        {
            NullReferenceException ex =  Assert.Throws<NullReferenceException>(() => homeController.Error());
            Assert.AreEqual("Object reference not set to an instance of an object.", ex.Message);

        }


    }
}
