import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'testmaker';

    private chapters: Array<any> = [];
    private uchapter = '';
    private languages: Array<any> = [];
    private ulanguage = '';

    private data: Array<any> = [];
    private selected: Array<any> = [];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.initLanguage();
    }

    initLanguage() {
        let url = 'http://localhost:8080/language';
        this.http.get(url)
            .subscribe(value => {
                console.log(value);
                this.languages = value;
            });
        url = 'http://localhost:8080/type';

        this.http.get(url)
            .subscribe(value => {
                console.log(value);
                this.chapters = value;
            });
    }


    chapterChange(uchapter: string) {
        this.uchapter = uchapter;
        console.log(this.uchapter);

        let that = this;
        this.http.get('http://localhost:8080/select?q=' + this.uchapter)
            .subscribe(value => {
                that.data = value;

            });
    }

    languageChange(ulanguage: string) {
        this.ulanguage = ulanguage;
        console.log(this.ulanguage);
    }

    add(i: number) {
        this.selected.push(this.data[i]);
        this.data.splice(i, 1);
    }

    del(i: number) {
        this.data.push(this.selected[i]);
        this.selected.splice(i, 1);
    }

    up(i: number) {
        if (this.selected.length <= 1 || i < 1) {
            return;
        } else {
            let temp = this.selected[i - 1];
            this.selected[i - 1] = this.selected[i];
            this.selected[i] = temp;
        }
    }

    down(i: number) {
        if (this.selected.length <= 1 || i > this.selected.length - 2) {
            return;
        } else {
            let temp = this.selected[i + 1];
            this.selected[i + 1] = this.selected[i];
            this.selected[i] = temp;
        }
    }

    preview() {
        if (this.selected.length < 1) {

        }
    }
}
