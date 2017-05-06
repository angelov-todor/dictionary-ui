import { Metadata } from '../metadata';
import { Router } from '@angular/router';
import { MetadataService } from '../metadata.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-metadata-list',
    templateUrl: './metadata-list.component.html',
    styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnInit {
    metadata: Metadata[];

    constructor(private router: Router,
                private metadataService: MetadataService) {
    }

    getMetadata(): void {
        this.metadataService.getMetadataList()
            .then(metadata => this.metadata = metadata);
    }

    ngOnInit(): void {
        this.getMetadata();
    }

    add(name: string, type: string): void {
        name = name.trim();
        if (!name) {
            return;
        }

        this.metadataService.create(name, type)
            .then(metadata => {
                this.metadata.push(metadata);
            });
    }
    delete(meta: Metadata): void {
        this.metadataService
            .delete(meta.id)
            .then(() => {
                this.metadata = this.metadata.filter(h => h !== meta);
            });
    }
}
