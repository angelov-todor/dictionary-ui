import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DictionaryWord } from '../../words/dictionary.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  syllablesForm: FormGroup;
  syllables: string;

  transcriptionForm: FormGroup;
  transcription: string;

  rhymeformForm: FormGroup;
  rhymeform: string;

  reductionForm: FormGroup;
  reduction: string;

  phonemesForm: FormGroup;
  phonemes: string;

  rhymesForm: FormGroup;
  rhymes: DictionaryWord[];

  constructor(private toolsSerivce: ToolsService,
              private fb: FormBuilder) {
    this.syllablesForm = fb.group({
      word: [null, [Validators.required]]
    });

    this.rhymeformForm = fb.group({
      word: [null, [Validators.required]]
    });

    this.transcriptionForm = fb.group({
      word: [null, [Validators.required]]
    });

    this.reductionForm = fb.group({
      word: [null, [Validators.required]]
    });

    this.phonemesForm = fb.group({
      word: [null, [Validators.required]]
    });

    this.rhymesForm = fb.group({
      word: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  showSyllables() {
    this.syllablesForm.markAsTouched();
    if (!this.syllablesForm.valid) {
      return;
    }
    this.toolsSerivce.getSyllables(this.syllablesForm.value)
      .subscribe((res) => this.syllables = res);
  }

  showRhymeform() {
    this.rhymeformForm.markAsTouched();
    if (!this.rhymeformForm.valid) {
      return;
    }
    this.toolsSerivce.getRhymeform(this.rhymeformForm.value)
      .subscribe((res) => this.rhymeform = res);
  }

  showTranscription() {
    this.transcriptionForm.markAsTouched();
    if (!this.transcriptionForm.valid) {
      return;
    }
    this.toolsSerivce.getTranscription(this.transcriptionForm.value)
      .subscribe((res) => this.transcription = res);
  }

  showReduction() {
    this.reductionForm.markAsTouched();
    if (!this.reductionForm.valid) {
      return;
    }
    this.toolsSerivce.getReduction(this.reductionForm.value)
      .subscribe((res) => this.reduction = res);
  }

  showPhonemes() {
    this.phonemesForm.markAsTouched();
    if (!this.phonemesForm.valid) {
      return;
    }
    this.toolsSerivce.getPhonemes(this.phonemesForm.value)
      .subscribe((res) => this.phonemes = res);
  }

  showRhymes() {
    this.rhymesForm.markAsTouched();
    if (!this.rhymesForm.valid) {
      return;
    }
    this.toolsSerivce.getRhymes(this.rhymesForm.value)
      .subscribe((res) => this.rhymes = res);
  }
}
