import axios from "axios";

const url =  process.env.NEXT_PUBLIC_API_URL;
// const url =  'https://getaccs.ru/api/';

const $host = axios.create({
	baseURL: url
})

const $authHost = axios.create(({
	baseURL: url
}))

const authInterceptor = config => {
	config.headers.Authorization = localStorage.getItem('token')
	return config
}


$authHost.interceptors.request.use(authInterceptor)
export {
	$host,
	$authHost
}