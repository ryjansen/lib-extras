using System;
using System.Web.Mvc;

namespace lib_extras_tests.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
