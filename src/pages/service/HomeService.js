import { axiosAuthHandler, axiosProductsHandler } from "../../handler/axiosHandler";

async function validateToken(navigate, toast) {
  const token = localStorage.getItem('token')
  try {
    const data = await axiosAuthHandler.get("/api/auth/validate", {
      headers: {
        "Authorization": JSON.stringify(token)
      }
    });

    if (data.status !== 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/");
      return
    }

    return null
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      navigate("/")
      return toast({
        title: 'Token expired, please login again',
        status: 'error',
        isClosable: true,
      })
    }
  }
}

async function getProducts(setProducts, toast, setPhoneTemp) {
  const token = localStorage.getItem('token')
  try {
    const data = await axiosProductsHandler.get("/api/products", {
      headers: {
        "Authorization": JSON.stringify(token)
      }
    });

    setProducts(data.data);
    setPhoneTemp(data.data)

  } catch (error) {

    if (error.message === 'Request failed with status code 404') {
      return toast({
        title: 'No products found in db',
        status: 'error',
        isClosable: true,
      })
    }
  }
}

export { validateToken, getProducts }