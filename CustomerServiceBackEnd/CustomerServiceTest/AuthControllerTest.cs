using CustomerApp.Controllers;
using CustomerUsers.Models;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using RestSharp;
using System.Net;

namespace CustomerServiceTest
{
    public class AuthControllerTest
    {
        UsersController usersController;
        IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.Development.json").Build();

        public AuthControllerTest()
        {
            usersController = new UsersController(config);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void MockTestAddition()
        {
            Assert.That(2 + 2 == 4, Is.True);
        }

        [Test]
        public void isRestApiWorking()
        {
            RestClient client = new RestClient("http://api.zippopotam.us");
            RestRequest request = new RestRequest("nl/3825", Method.Get);
            var response = client.Execute(request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }

        [Test]
        public void isAuthApiWorking()
        {
            dynamic result = usersController.Get();
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public void isLoginWorking()
        {
            User u = new User
            {
                Email = "sourav@test.com",
                Password = "1234"
            };
            dynamic result = usersController.LoginUser(u);
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public void isLogin_Failure_with_Bad_Credential_Working()
        {
            User u = new User
            {
                Email = "sourav@test.com",
                Password = "wrong_pass"
            };
            dynamic result = usersController.LoginUser(u);
            Assert.That(result.StatusCode, Is.EqualTo(401));
        }
        [Test]
        public void isLogin_Admin_Working()
        {
            Admin u = new Admin
            {
                UserName = "sxoxo123",
                Password = "password"
            };
            dynamic result = usersController.LoginAdmin(u);
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }
        [Test]
        public void Same_User_Registration_Check()
        {
            User u = new User
            {
                Email = "sourav@test.com",
                PhoneNo = "9999999999"
            };
            dynamic result = usersController.RegisterUser(u);
            Assert.AreEqual(result.StatusCode, 409);
        }

        [Test]
        public void Get_User()
        {
            dynamic result = usersController.GetUser(2);
            Assert.IsNotNull(result);
        }

        [Test]
        public void WrongId_Update_User_Test()
        {
            User u = new User
            {
               
            };

            dynamic result = usersController.UpdateUser(3,u);
            Assert.AreEqual(result.StatusCode, 404);
        }

    }
}