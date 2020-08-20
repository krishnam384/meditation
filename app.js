const app =() => {

	const song = document.querySelector('.song');
	const play = document.querySelector('.play');
	const outline = document.querySelector('.moving-outline circle');
	const video = document.querySelector('.video-container video');

	//sounds

	const sounds = document.querySelectorAll('.sound-picker button');

	//Time Display

	const timeDisplay = document.querySelector('.time-display');
	const timeSelect = document.querySelectorAll('.time-select button');

	timeSelect.forEach(option => {

		option.addEventListener('click', function(){


			fakeDuration = this.getAttribute('data-time');
			let seconds = Math.floor(fakeDuration % 60);
			let minutes = Math.floor(fakeDuration /60);
			timeDisplay.textContent = `${minutes}:${seconds}`;
			

		})
	})

	// Get Outline Length

	const outlineLength = outline.getTotalLength();
	
	//Duration

	let fakeDuration = 600;

	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	//play audio by clicking on image

	play.addEventListener('click', () => {
		checkPlay(song);
	})


	//add specific function to play and pause the song

	const checkPlay = song => {

		if(song.paused){

			song.play();
			video.play();
			play.src = "./svg/pause.svg";

		}else{

			song.pause();
			video.pause();
			play.src="./svg/play.svg";
		}
	};

	song.ontimeupdate = () => {

		let currentTime = song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minutes = Math.floor(elapsed /60);
		let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;

		outline.style.strokeDashoffset = progress;


		timeDisplay.textContent = `${minutes}:${seconds}`;
		if(currentTime>= fakeDuration){
			song.pause();
			video.pause();
			song.currentTime=0;
			play.src='./svg/play.svg';
		}
	}

	//selecting different sounds

	sounds.forEach(sound =>{


		sound.addEventListener('click', function(){

			video.src=this.getAttribute('data-video');
			song.src=this.getAttribute('data-sound');
			checkPlay(song);
		})
	})



}


app();







