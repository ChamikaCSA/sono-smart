import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

interface Question {
  id: number;
  text: string;
  imageUrl: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css'],
})
export class QaComponent implements OnInit, OnDestroy {
  isQuizStarted: boolean = false;

  questions: Question[] = [
    {
      id: 1,
      text: 'Which organ is shown in this ultrasound image?',
      imageUrl: 'assets/images/qa/liver.jpg',
      options: ['Kidney', 'Liver', 'Spleen', 'Gallbladder'],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'Identify the organ in this ultrasound scan:',
      imageUrl: 'assets/images/qa/kidney.jpg',
      options: ['Liver', 'Bladder', 'Kidney', 'Bowel'],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'What organ is being visualized in this image?',
      imageUrl: 'assets/images/qa/gallbladder.jpg',
      options: ['Gallbladder', 'Spleen', 'Bladder', 'Liver'],
      correctAnswer: 0
    },
    {
      id: 4,
      text: 'Identify the correct organ shown in this ultrasound:',
      imageUrl: 'assets/images/qa/spleen.jpg',
      options: ['Liver', 'Kidney', 'Bowel', 'Spleen'],
      correctAnswer: 3
    },
    {
      id: 5,
      text: 'Which abdominal organ is displayed in this image?',
      imageUrl: 'assets/images/qa/bladder.jpg',
      options: ['Bowel', 'Bladder', 'Gallbladder', 'Kidney'],
      correctAnswer: 1
    }
  ];

  currentQuestionIndex: number = 0;
  currentQuestion: Question | null = null;
  showResults: boolean = false;
  correctAnswers: number = 0;
  private timerSubscription?: Subscription;
  remainingTime: string = '15:00';

  ngOnInit(): void {
    this.currentQuestion = this.questions[0];
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private startTimer(): void {
    const duration = 15 * 60; // 15 minutes in seconds
    this.timerSubscription = interval(1000)
      .pipe(take(duration + 1))
      .subscribe(tick => {
        const remaining = duration - tick;
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        this.remainingTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (remaining === 0) {
          this.calculateResults();
          this.showResults = true;
          this.timerSubscription?.unsubscribe();
        }
      });
  }

  selectAnswer(index: number): void {
    if (this.currentQuestion) {
      this.currentQuestion.selectedAnswer = index;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.calculateResults();
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  calculateResults(): void {
    this.correctAnswers = this.questions.filter(
      q => q.selectedAnswer === q.correctAnswer
    ).length;
  }

  restartQuiz(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.questions.forEach(q => {
      q.selectedAnswer = undefined;
    });
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.showResults = false;
    this.correctAnswers = 0;
    this.remainingTime = '15:00';
    this.isQuizStarted = false;
  }

  startQuiz(): void {
    this.isQuizStarted = true;
    this.startTimer();
  }
}
