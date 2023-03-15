const API_URL = "http://localhost:9000/api";
function signupSignin(formName, userDetails) {
	let endPoint;
	formName == "Login"
		? (endPoint = `${API}/signin`)
		: (endPoint = `${API}/signup`);

	return fetch(`${endPoint}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userDetails),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
}

const signout = (next) => {
	removeLocalStorage("token");
	removeLocalStorage("user");
	next();

	return fetch(`${API}/signout`, {
		method: "GET",
	})
		.then((response) => {
			console.log("signout successfull");
		})
		.catch((err) => console.log(err));
};

//set cookie
// const setCookie = (key, value) => {
//     if (typeof window !== "undefined") {
//       cookie.set(key, value, {
//         expires: 1,
//       });
//     }
//   };

// const removeCookie = (key) => {
//     if (typeof window !== "undefined") {
//       cookie.remove(key, {
//         expires: 1,
//       });
//     }
//   };

// const getCookie = (key) => {
//     if (typeof window !== "undefined") {
//       return cookie.get(key);
//     }
//   };

//localStrorage
const setLocalStorage = (key, value) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

const removeLocalStorage = (key) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(key);
	}
};

//Authenticate use by pass data to cookie and localStorage
const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		setLocalStorage("user", data.user);
		setLocalStorage("token", data.token);
		// setCookie("token", data.token)
		next();
	}
};

function isAuth() {
	if (typeof window != "undefined") {
		const tokenChecked = window.localStorage.getItem("token");
		console.log("token");
		if (tokenChecked) {
			if (localStorage.getItem("user")) {
				return JSON.parse(localStorage.getItem("user"));
			} else {
				return false;
			}
		}
	}
}
