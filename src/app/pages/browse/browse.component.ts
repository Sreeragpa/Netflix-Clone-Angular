import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, combineLatest, forkJoin, map, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent,BannerComponent,MovieCarouselComponent,CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  movieService = inject(MovieService)
  name = JSON.parse(sessionStorage.getItem("LoggedInUser")!).name
  profileImage = JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture
  email = JSON.parse(sessionStorage.getItem("LoggedInUser")!).email

  bannerDetail = new Observable<any>()
  bannerVideo = new Observable<any>()

  movies: IVideoContent[] = []
  tvShows: IVideoContent[] = []
  ratedMovies: IVideoContent[] = []
  nowPlayingMovies: IVideoContent[] = []
  popularMovies: IVideoContent[] = []
  topRatedMovies: IVideoContent[] = []
  upcomingMovies: IVideoContent[] = []

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated(),
    this.movieService.getUpcomingMovies(),
  ]

  ngOnInit(): void {
    // forkJoin(this.sources)
    //   .pipe(
    //     map(([movies,tvShows,nowPlaying,upcoming,popular,topRated])=>{
    //       return {movies,tvShows,nowPlaying,upcoming,popular,topRated}
    //     })
    //   ).subscribe((res: any)=>{
    //     this.test = res
        
    //     this.movies = res.movies.results as IVideoContent[]
    //     this.tvShows = res.tvShows.results as IVideoContent[]
    //     this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[]
    //     this.popularMovies = res.upcoming.results as IVideoContent[]
    //     this.topRatedMovies = res.popular.results as IVideoContent[]
    //     this.upcomingMovies = res.topRated.results as IVideoContent[]

    //     console.log(this.test);
    //     console.log(this.movies);
    //   });

      const joinedData = combineLatest(this.sources);
      joinedData.subscribe(([movies,tvShows,nowPlaying,upcoming,popular,topRated])=>{
        this.bannerDetail = this.movieService.getBannerDetail(movies.results[1].id)
        this.bannerVideo = this.movieService.getBannerVideo(movies.results[1].id)
        this.movies = movies.results as IVideoContent[]
        this.tvShows = tvShows.results as IVideoContent[]
        this.nowPlayingMovies = nowPlaying.results as IVideoContent[]
        this.popularMovies = upcoming.results as IVideoContent[]
        this.topRatedMovies = popular.results as IVideoContent[]
        this.upcomingMovies = topRated.results as IVideoContent[]
      })

   
      

}
  signOut(){
    sessionStorage.removeItem("LoggedInUser")
    this.auth.signOut();
  }
 
}
