import { Component, OnDestroy } from '@angular/core';

import { Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnDestroy {
    images: string[] = [
        '../../assets/images/cat.jpg',
        '../../assets/images/gorilla.jpg',
        '../../assets/images/owl.jpg',
        '../../assets/images/squirrel.jpg',
        '../../assets/images/dog.jpg',
        '../../assets/images/parrot.jpg',
        '../../assets/images/tiger.jpg',
        '../../assets/images/elephant.jpg',
    ];

    selectedImage: string;
    imageWidth: number = 640;
    index = 0;
    isPlaying: boolean = false;

    // @ts-ignore
    private timerSubscription: Subscription;

    constructor() {
        this.selectedImage = this.images[this.index];
    }

    ngOnDestroy(): void {
        this.timerSubscription?.unsubscribe();
    }

    next(): void {
        this.index = (this.index + 1) % this.images.length;
        this.selectedImage = this.images[this.index];
    }

    previous(): void {
        this.index = this.index === 0 ? this.images.length - 1 : this.index - 1;
        this.selectedImage = this.images[this.index];
    }

    selectImage(index: number): void {
        this.index = index;
        this.selectedImage = this.images[this.index];
    }

    play(): void {
        this.isPlaying = true;
        const counter$ = timer(2000, 2000);
        this.timerSubscription = counter$.subscribe(() => this.next());
    }

    stop(): void {
        this.isPlaying = false;
        this.timerSubscription.unsubscribe();
    }
}
