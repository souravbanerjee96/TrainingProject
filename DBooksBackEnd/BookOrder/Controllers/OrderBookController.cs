using BookOrder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBookController : ControllerBase
    {
        DigitalBookContext db;

        public OrderBookController(DigitalBookContext _db)
        {
            db = _db;
        }
    }
}
