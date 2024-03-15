import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
	let token = sessionStorage.getItem("token");

	const [moviesList, setMoviesList] = useState([]);
	const [loading, setLoading] = useState(true);

	const API_KEY = "3d0dbaba1ed955f27af66d0c59898ec2";

	console.log(moviesList);

	useEffect(() => {
		const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
		axios
			.get(endPoint)
			.then((res) => {
				const apiData = res.data.results;
				setMoviesList(apiData.sort((a, b) => b.vote_average - a.vote_average));
				setLoading(false);
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					title: "Error de conexión",
					text: "Error al conectar con la API",
				});
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h2>Las mejores películas</h2>
			<section className="total-movies">
				{moviesList.map((movie, i) => {
					console.log(movie);
					return (
						<div key={movie.id}>
							<h1>{movie.title}</h1>
							<p>{movie.release_path}</p>
							<p>{movie.original_language}</p>{" "}
							<img
								className="img-detail"
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							/>
						</div>
					);
				})}
			</section>
		</>
	);
}

export default App;
