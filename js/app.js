/**
 * Core Quiz Application Controller
 * Matematika Kelas 3 SD Semester Ganjil (Kurikulum Merdeka)
 * Bab 3: Pengukuran Panjang dan Berat (30 Soal + Ilustrasi)
 */

class QuizApp {
    constructor() {
        this.totalQuestions = typeof QUIZ_DATA !== 'undefined' ? QUIZ_DATA.length : 30;
        this.passingScore = 75;
        this.questionQueue = [];
        this.currentIndex = 0;
        this.studentName = '';
        this.studentClass = '';
        this.answersHistory = [];
        this.streakCount = 0;
        this.startTime = null;
        this.isAnswered = false;
        this.isTransitioning = false;
        this.activeTeacherPin = '';
        this.currentClassFilter = 'Semua';
        this.currentSearchQuery = '';
        this.cachedTeacherSubmissions = [];
        this.pendingCompletedRecord = null;
        this.pendingResumeState = null;

        this.initElements();
        this.bindEvents();
        this.initApp();
    }

    /**
     * Bind all DOM element references strictly matching index.html
     */
    initElements() {
        this.el = {
            // Screens
            welcomeScreen: document.getElementById('welcome-screen'),
            quizScreen: document.getElementById('quiz-screen'),
            calculatingScreen: document.getElementById('calculating-screen'),
            resultScreen: document.getElementById('result-screen'),
            teacherScreen: document.getElementById('teacher-screen'),

            // Top Nav Controls
            btnToggleSfx: document.getElementById('btn-toggle-sfx'),
            btnToggleNarration: document.getElementById('btn-toggle-narration'),
            btnOpenTeacherModal: document.getElementById('btn-open-teacher-modal'),

            // Welcome Screen
            alreadyNotice: document.getElementById('already-notice'),
            studentName: document.getElementById('student-name'),
            studentClass: document.getElementById('student-class'),
            btnStartQuiz: document.getElementById('btn-start-quiz'),

            // Quiz Screen
            badgeBab: document.getElementById('badge-bab'),
            badgeDifficulty: document.getElementById('badge-difficulty'),
            streakIndicator: document.getElementById('streak-indicator'),
            progressBarFill: document.getElementById('progress-bar-fill'),
            textProgress: document.getElementById('text-progress'),
            questionMediaBadge: document.getElementById('question-media-badge'),
            btnListenQuestion: document.getElementById('btn-listen-question'),
            questionMediaContainer: document.getElementById('question-media-container'),
            questionImage: document.getElementById('question-image'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),

            // Calculating Screen
            calcProgressFill: document.getElementById('calc-progress-fill'),
            calcStatusText: document.getElementById('calc-status-text'),

            // Result Screen
            resultStudentName: document.getElementById('result-student-name'),
            resultScoreNumber: document.getElementById('result-score-number'),
            resultStatusBadge: document.getElementById('result-status-badge'),
            resultCorrectCount: document.getElementById('result-correct-count'),
            resultWrongCount: document.getElementById('result-wrong-count'),
            resultSub1Score: document.getElementById('result-sub1-score'),
            resultSub1Bar: document.getElementById('result-sub1-bar'),
            resultSub2Score: document.getElementById('result-sub2-score'),
            resultSub2Bar: document.getElementById('result-sub2-bar'),
            resultSub3Score: document.getElementById('result-sub3-score'),
            resultSub3Bar: document.getElementById('result-sub3-bar'),
            resultSub4Score: document.getElementById('result-sub4-score'),
            resultSub4Bar: document.getElementById('result-sub4-bar'),
            resultAdvice: document.getElementById('result-advice'),

            // Teacher Screen
            btnOpenGasSettings: document.getElementById('btn-open-gas-settings'),
            btnRefreshTeacher: document.getElementById('btn-refresh-teacher'),
            btnExitTeacher: document.getElementById('btn-exit-teacher'),
            teacherStatTotal: document.getElementById('teacher-stat-total'),
            teacherStatAvg: document.getElementById('teacher-stat-avg'),
            teacherStatHighest: document.getElementById('teacher-stat-highest'),
            teacherStatLowest: document.getElementById('teacher-stat-lowest'),
            teacherStatPassed: document.getElementById('teacher-stat-passed'),
            teacherSub1Stat: document.getElementById('teacher-sub1-stat'),
            teacherSub1Bar: document.getElementById('teacher-sub1-bar'),
            teacherSub2Stat: document.getElementById('teacher-sub2-stat'),
            teacherSub2Bar: document.getElementById('teacher-sub2-bar'),
            teacherSub3Stat: document.getElementById('teacher-sub3-stat'),
            teacherSub3Bar: document.getElementById('teacher-sub3-bar'),
            teacherSub4Stat: document.getElementById('teacher-sub4-stat'),
            teacherSub4Bar: document.getElementById('teacher-sub4-bar'),
            btnExportExcel: document.getElementById('btn-export-excel'),
            btnExportPdf: document.getElementById('btn-export-pdf'),
            btnExportWord: document.getElementById('btn-export-word'),
            teacherSearchInput: document.getElementById('teacher-search-input'),
            teacherTableBody: document.getElementById('teacher-table-body'),
            classTabBtns: document.querySelectorAll('.class-tab-btn'),

            // Feedback Modal
            feedbackModal: document.getElementById('feedback-modal'),
            feedbackIcon: document.getElementById('feedback-icon'),
            feedbackTitle: document.getElementById('feedback-title'),
            feedbackAppreciation: document.getElementById('feedback-appreciation'),
            feedbackExplanation: document.getElementById('feedback-explanation'),
            btnNextQuestion: document.getElementById('btn-next-question'),

            // PIN Modal
            teacherPinModal: document.getElementById('teacher-pin-modal'),
            teacherPinInput: document.getElementById('teacher-pin-input'),
            teacherPinError: document.getElementById('teacher-pin-error'),
            btnClosePinModal: document.getElementById('btn-close-pin-modal'),
            btnSubmitPin: document.getElementById('btn-submit-pin'),
            pinKeys: document.querySelectorAll('.pin-key'),

            // GAS Settings Modal
            gasSettingsModal: document.getElementById('gas-settings-modal'),
            gasUrlInput: document.getElementById('gas-url-input'),
            btnCloseGasModal: document.getElementById('btn-close-gas-modal'),
            btnSaveGasUrl: document.getElementById('btn-save-gas-url')
        };
    }

    /**
     * Attach UI event listeners
     */
    bindEvents() {
        // Audio Controls
        if (this.el.btnToggleSfx) {
            this.el.btnToggleSfx.addEventListener('click', () => {
                window.audioEngine.toggleSFX();
                this.updateAudioButtonsUI();
                window.audioEngine.playClick();
            });
        }

        if (this.el.btnToggleNarration) {
            this.el.btnToggleNarration.addEventListener('click', () => {
                window.audioEngine.playClick();
                window.audioEngine.toggleNarration();
                this.updateAudioButtonsUI();
            });
        }

        // Welcome Form
        if (this.el.btnStartQuiz) {
            this.el.btnStartQuiz.addEventListener('click', () => this.handleStartQuizClick());
        }
        if (this.el.studentName) {
            this.el.studentName.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleStartQuizClick();
            });
            this.el.studentName.addEventListener('input', () => this.onIdentityFieldChange());
        }
        if (this.el.studentClass) {
            this.el.studentClass.addEventListener('change', () => this.onIdentityFieldChange());
        }

        // Listen question button
        if (this.el.btnListenQuestion) {
            this.el.btnListenQuestion.addEventListener('click', () => this.speakCurrentQuestion(true));
        }

        // Next question button in feedback modal
        if (this.el.btnNextQuestion) {
            this.el.btnNextQuestion.addEventListener('click', () => this.handleNextQuestion());
        }

        // Teacher PIN Modal triggers
        if (this.el.btnOpenTeacherModal) {
            this.el.btnOpenTeacherModal.addEventListener('click', () => this.openPinModal());
        }
        if (this.el.btnClosePinModal) {
            this.el.btnClosePinModal.addEventListener('click', () => this.closePinModal());
        }
        if (this.el.btnSubmitPin) {
            this.el.btnSubmitPin.addEventListener('click', () => this.handleVerifyPin());
        }
        if (this.el.teacherPinInput) {
            this.el.teacherPinInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleVerifyPin();
            });
        }

        // Keypad buttons inside PIN Modal
        if (this.el.pinKeys && this.el.pinKeys.length > 0) {
            this.el.pinKeys.forEach((keyBtn) => {
                keyBtn.addEventListener('click', () => {
                    window.audioEngine.playClick();
                    const keyVal = keyBtn.getAttribute('data-num');
                    this.handleKeypadInput(keyVal);
                });
            });
        }

        // Teacher Dashboard Actions
        if (this.el.btnExitTeacher) {
            this.el.btnExitTeacher.addEventListener('click', () => {
                window.audioEngine.playClick();
                this.activeTeacherPin = '';
                this.showScreen('welcomeScreen');
            });
        }

        if (this.el.btnRefreshTeacher) {
            this.el.btnRefreshTeacher.addEventListener('click', () => {
                window.audioEngine.playClick();
                this.refreshTeacherData();
            });
        }

        if (this.el.btnOpenGasSettings) {
            this.el.btnOpenGasSettings.addEventListener('click', () => this.openGasModal());
        }
        if (this.el.btnCloseGasModal) {
            this.el.btnCloseGasModal.addEventListener('click', () => this.closeGasModal());
        }
        if (this.el.btnSaveGasUrl) {
            this.el.btnSaveGasUrl.addEventListener('click', () => this.handleSaveGasUrl());
        }

        // Teacher Class Filter Tabs
        if (this.el.classTabBtns && this.el.classTabBtns.length > 0) {
            this.el.classTabBtns.forEach((tab) => {
                tab.addEventListener('click', () => {
                    window.audioEngine.playClick();
                    this.el.classTabBtns.forEach((t) => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.currentClassFilter = tab.getAttribute('data-kelas') || 'Semua';
                    this.renderTeacherDashboardTable();
                });
            });
        }

        // Teacher Search
        if (this.el.teacherSearchInput) {
            this.el.teacherSearchInput.addEventListener('input', (e) => {
                this.currentSearchQuery = (e.target.value || '').trim();
                this.renderTeacherDashboardTable();
            });
        }

        // Teacher Export Buttons
        if (this.el.btnExportExcel) {
            this.el.btnExportExcel.addEventListener('click', () => {
                window.audioEngine.playClick();
                const data = this.getCurrentlyFilteredTeacherData();
                window.exportEngine.exportToExcel(data, this.currentClassFilter);
            });
        }
        if (this.el.btnExportPdf) {
            this.el.btnExportPdf.addEventListener('click', () => {
                window.audioEngine.playClick();
                const data = this.getCurrentlyFilteredTeacherData();
                window.exportEngine.exportToPDF(data, this.currentClassFilter);
            });
        }
        if (this.el.btnExportWord) {
            this.el.btnExportWord.addEventListener('click', () => {
                window.audioEngine.playClick();
                const data = this.getCurrentlyFilteredTeacherData();
                window.exportEngine.exportToWord(data, this.currentClassFilter);
            });
        }

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.el.teacherPinModal && !this.el.teacherPinModal.classList.contains('hidden')) {
                    this.closePinModal();
                }
                if (this.el.gasSettingsModal && !this.el.gasSettingsModal.classList.contains('hidden')) {
                    this.closeGasModal();
                }
            }
        });
    }

    /**
     * Initialize initial state, verify cloud lock status, and detect saved progress
     */
    async initApp() {
        this.updateAudioButtonsUI();
        this.showScreen('welcomeScreen');
        await this.syncAndEvaluateDeviceState();
    }

    /**
     * Verify completed lock against cloud/local SSoT and evaluate welcome notice state
     */
    async syncAndEvaluateDeviceState() {
        const completedRaw = localStorage.getItem(window.dbManager.STUDENT_COMPLETED_KEY);
        if (completedRaw) {
            try {
                const completed = JSON.parse(completedRaw);
                if (completed.nama && completed.kelas) {
                    const onlineRes = await window.dbManager.checkStudentStatusOnline(completed.nama, completed.kelas);
                    if (!onlineRes.submitted) {
                        localStorage.removeItem(window.dbManager.STUDENT_COMPLETED_KEY);
                    }
                }
            } catch (err) {
                console.warn('Sinkronisasi status awal dilewati:', err);
            }
        }

        this.evaluateLocalDeviceNotice();
    }

    /**
     * Evaluate local completion lock or unfinished quiz progress for crash recovery
     */
    evaluateLocalDeviceNotice() {
        const completedRaw = localStorage.getItem(window.dbManager.STUDENT_COMPLETED_KEY);
        const progressRaw = localStorage.getItem(window.dbManager.IN_PROGRESS_KEY);
        const submissions = window.dbManager.getLocalSubmissions();

        // Check completed record first, keeping lock only if still present in SSoT submissions
        if (completedRaw) {
            try {
                const completed = JSON.parse(completedRaw);
                const matchInDb = submissions.find((item) =>
                    this.normalizeName(item.nama) === this.normalizeName(completed.nama) &&
                    this.normalizeName(item.kelas) === this.normalizeName(completed.kelas)
                );

                if (matchInDb) {
                    this.pendingCompletedRecord = matchInDb;
                    if (this.el.studentName && !this.el.studentName.value) {
                        this.el.studentName.value = matchInDb.nama;
                    }
                    if (this.el.studentClass && matchInDb.kelas) {
                        this.el.studentClass.value = matchInDb.kelas;
                    }
                    this.renderWelcomeNotice(
                        'warning',
                        `<strong>🔒 Sudah Selesai:</strong> Halo <strong>${this.escapeHtml(matchInDb.nama)}</strong> (Kelas ${this.escapeHtml(matchInDb.kelas)}), kamu sudah menyelesaikan kuis ini dengan nilai <strong>${matchInDb.skor}</strong>. Klik tombol di bawah untuk melihat skormu.`
                    );
                    if (this.el.btnStartQuiz) {
                        this.el.btnStartQuiz.textContent = 'Lihat Nilai Saya 🏆';
                    }
                    return;
                }
                localStorage.removeItem(window.dbManager.STUDENT_COMPLETED_KEY);
                this.pendingCompletedRecord = null;
            } catch (e) {
                localStorage.removeItem(window.dbManager.STUDENT_COMPLETED_KEY);
            }
        }

        // Check crash recovery / auto-resume progress
        if (progressRaw) {
            try {
                const saved = JSON.parse(progressRaw);
                if (this.isValidInProgressState(saved)) {
                    const alreadyDone = submissions.find((item) =>
                        this.normalizeName(item.nama) === this.normalizeName(saved.studentName) &&
                        this.normalizeName(item.kelas) === this.normalizeName(saved.studentClass)
                    );
                    if (alreadyDone) {
                        localStorage.removeItem(window.dbManager.IN_PROGRESS_KEY);
                        this.pendingResumeState = null;
                    } else {
                        this.pendingResumeState = saved;
                        if (this.el.studentName && !this.el.studentName.value) {
                            this.el.studentName.value = saved.studentName;
                        }
                        if (this.el.studentClass && saved.studentClass) {
                            this.el.studentClass.value = saved.studentClass;
                        }
                        const soalKe = saved.currentIndex + 1;
                        const total = saved.questionQueue.length;
                        this.renderWelcomeNotice(
                            'info',
                            `<strong>📌 Progres Tersimpan:</strong> Kuis <strong>${this.escapeHtml(saved.studentName)}</strong> (Kelas ${this.escapeHtml(saved.studentClass)}) berhenti pada <strong>Soal ${soalKe} dari ${total}</strong>. Klik Mulai untuk melanjutkan.`
                        );
                        if (this.el.btnStartQuiz) {
                            this.el.btnStartQuiz.textContent = `Lanjutkan Soal ${soalKe} 🚀`;
                        }
                        return;
                    }
                }
            } catch (e) {
                localStorage.removeItem(window.dbManager.IN_PROGRESS_KEY);
            }
        }

        this.clearWelcomeNotice();
    }

    /**
     * Re-evaluate welcome notice state when student edits name or class fields
     */
    onIdentityFieldChange() {
        const nama = (this.el.studentName ? this.el.studentName.value : '').trim();
        const kelas = (this.el.studentClass ? this.el.studentClass.value : '').trim();

        if (!nama || !kelas) {
            if (!this.pendingCompletedRecord && !this.pendingResumeState) {
                this.clearWelcomeNotice();
            }
            return;
        }

        const localCheck = window.dbManager.isAlreadySubmitted(nama, kelas);
        if (localCheck && localCheck.submitted && localCheck.data) {
            const matchDone = localCheck.data;
            this.pendingCompletedRecord = matchDone;
            this.renderWelcomeNotice(
                'warning',
                `<strong>🔒 Sudah Selesai:</strong> <strong>${this.escapeHtml(matchDone.nama)}</strong> (Kelas ${this.escapeHtml(matchDone.kelas)}) sudah mengerjakan kuis ini dengan nilai <strong>${matchDone.skor}</strong>.`
            );
            if (this.el.btnStartQuiz) {
                this.el.btnStartQuiz.textContent = 'Lihat Nilai Saya 🏆';
            }
            return;
        }

        this.pendingCompletedRecord = null;
        if (this.pendingResumeState &&
            this.normalizeName(this.pendingResumeState.studentName) === this.normalizeName(nama) &&
            this.normalizeName(this.pendingResumeState.studentClass) === this.normalizeName(kelas)) {
            const soalKe = this.pendingResumeState.currentIndex + 1;
            const total = this.pendingResumeState.questionQueue.length;
            this.renderWelcomeNotice(
                'info',
                `<strong>📌 Progres Tersimpan:</strong> Melanjutkan pengerjaan <strong>${this.escapeHtml(nama)}</strong> dari <strong>Soal ${soalKe} dari ${total}</strong>.`
            );
            if (this.el.btnStartQuiz) {
                this.el.btnStartQuiz.textContent = `Lanjutkan Soal ${soalKe} 🚀`;
            }
            return;
        }

        this.clearWelcomeNotice();
    }

    renderWelcomeNotice(variant, htmlMessage) {
        if (!this.el.alreadyNotice) return;
        this.el.alreadyNotice.className = `alert-box ${variant === 'warning' ? 'alert-warning' : 'alert-info'}`;
        this.el.alreadyNotice.innerHTML = htmlMessage;
    }

    clearWelcomeNotice() {
        if (this.el.alreadyNotice) {
            this.el.alreadyNotice.className = 'hidden';
            this.el.alreadyNotice.innerHTML = '';
        }
        if (this.el.btnStartQuiz) {
            this.el.btnStartQuiz.textContent = 'Mulai Kuis Sekarang 🚀';
        }
    }

    /**
     * Validate Start Quiz click (1x attempt lock, online SSoT check, or auto-resume)
     */
    async handleStartQuizClick() {
        window.audioEngine.playClick();

        const nama = (this.el.studentName ? this.el.studentName.value : '').trim();
        const kelas = (this.el.studentClass ? this.el.studentClass.value : '').trim();

        if (!nama) {
            this.showInlineInputWarning('Silakan tulis nama lengkapmu terlebih dahulu ya!');
            if (this.el.studentName) this.el.studentName.focus();
            return;
        }
        if (!kelas) {
            this.showInlineInputWarning('Silakan pilih kelasmu terlebih dahulu!');
            if (this.el.studentClass) this.el.studentClass.focus();
            return;
        }

        this.setStartButtonLoading(true, 'Memeriksa Data...');

        try {
            let existingRecord = null;
            const onlineStatus = await window.dbManager.checkStudentStatusOnline(nama, kelas);
            if (onlineStatus && onlineStatus.submitted && onlineStatus.data) {
                existingRecord = onlineStatus.data;
            }

            if (existingRecord) {
                window.dbManager.markStudentCompleted(existingRecord);
                this.showExistingResultScreen(existingRecord);
                return;
            }

            // Check in-progress crash recovery state matching this student
            const progressRaw = localStorage.getItem(window.dbManager.IN_PROGRESS_KEY);
            if (progressRaw) {
                try {
                    const saved = JSON.parse(progressRaw);
                    if (this.isValidInProgressState(saved) &&
                        this.normalizeName(saved.studentName) === this.normalizeName(nama) &&
                        this.normalizeName(saved.studentClass) === this.normalizeName(kelas)) {
                        this.resumeQuizFromState(saved);
                        return;
                    }
                } catch (err) {
                    localStorage.removeItem(window.dbManager.IN_PROGRESS_KEY);
                }
            }

            this.startFreshQuiz(nama, kelas);
        } finally {
            this.setStartButtonLoading(false);
        }
    }

    showInlineInputWarning(message) {
        this.renderWelcomeNotice('warning', `⚠️ ${this.escapeHtml(message)}`);
    }

    setStartButtonLoading(isLoading, label) {
        if (!this.el.btnStartQuiz) return;
        this.el.btnStartQuiz.disabled = isLoading;
        if (isLoading && label) {
            this.el.btnStartQuiz.textContent = label;
        } else if (!isLoading) {
            this.onIdentityFieldChange();
        }
    }

    /**
     * Start a fresh quiz session with dual-layer anti-cheat shuffling
     */
    startFreshQuiz(nama, kelas) {
        this.studentName = nama;
        this.studentClass = kelas;
        this.questionQueue = this.buildShuffledQuestionQueue();
        this.totalQuestions = this.questionQueue.length;
        this.currentIndex = 0;
        this.answersHistory = [];
        this.streakCount = 0;
        this.startTime = Date.now();
        this.isAnswered = false;

        this.saveProgress();
        this.showScreen('quizScreen');
        this.loadQuestionAtCurrentIndex();
    }

    /**
     * Resume an interrupted quiz session from saved state
     */
    resumeQuizFromState(saved) {
        this.studentName = saved.studentName;
        this.studentClass = saved.studentClass;
        this.questionQueue = saved.questionQueue;
        this.totalQuestions = saved.questionQueue.length;
        this.currentIndex = saved.currentIndex;
        this.answersHistory = Array.isArray(saved.answersHistory) ? saved.answersHistory : [];
        this.streakCount = Number(saved.streakCount) || 0;
        this.startTime = saved.startTime || Date.now();
        this.isAnswered = false;

        this.showScreen('quizScreen');
        this.loadQuestionAtCurrentIndex();
    }

    /**
     * Immutable Fisher-Yates shuffle
     */
    shuffleArray(items) {
        const arr = [...items];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    /**
     * Dual-layer anti-cheat: shuffle 30 questions AND shuffle A/B/C/D options per student
     */
    buildShuffledQuestionQueue() {
        const shuffledQuestions = this.shuffleArray(QUIZ_DATA);
        return shuffledQuestions.map((q) => {
            const indexedOptions = q.options.map((text, idx) => ({
                text,
                isCorrect: idx === q.answer
            }));
            const shuffledOptions = this.shuffleArray(indexedOptions);
            const newAnswerIndex = shuffledOptions.findIndex((opt) => opt.isCorrect);

            return {
                id: q.id,
                subBabId: q.subBabId,
                subBabTitle: q.subBabTitle,
                difficulty: q.difficulty,
                question: q.question,
                image: q.image || null,
                imageAlt: q.imageAlt || '',
                options: shuffledOptions.map((opt) => opt.text),
                answer: newAnswerIndex,
                isAudioQuestion: Boolean(q.isAudioQuestion),
                appreciation: q.appreciation,
                explanation: q.explanation
            };
        });
    }

    isValidInProgressState(state) {
        return Boolean(
            state &&
            state.studentName &&
            state.studentClass &&
            Array.isArray(state.questionQueue) &&
            state.questionQueue.length === QUIZ_DATA.length &&
            typeof state.currentIndex === 'number' &&
            state.currentIndex >= 0 &&
            state.currentIndex < state.questionQueue.length
        );
    }

    saveProgress() {
        if (!this.studentName || !this.questionQueue.length) return;
        const payload = {
            studentName: this.studentName,
            studentClass: this.studentClass,
            currentIndex: this.currentIndex,
            questionQueue: this.questionQueue,
            answersHistory: this.answersHistory,
            streakCount: this.streakCount,
            startTime: this.startTime,
            updatedAt: new Date().toISOString()
        };
        try {
            localStorage.setItem(window.dbManager.IN_PROGRESS_KEY, JSON.stringify(payload));
        } catch (e) {
            console.warn('Gagal menyimpan progres kuis lokal:', e);
        }
    }

    /**
     * Render current question, optional SVG illustration, badges, and options
     */
    loadQuestionAtCurrentIndex() {
        window.audioEngine.stopSpeaking();
        this.isAnswered = false;
        this.isTransitioning = false;

        const q = this.questionQueue[this.currentIndex];
        if (!q) return;

        if (this.el.badgeBab) {
            this.el.badgeBab.textContent = q.subBabTitle || `Sub-bab ${q.subBabId}`;
        }

        if (this.el.badgeDifficulty) {
            const diffMap = {
                easy: { label: '🟢 Mudah ⭐', cls: 'diff-easy' },
                medium: { label: '🟡 Sedang ⭐⭐', cls: 'diff-medium' },
                hard: { label: '🔴 Menantang ⭐⭐⭐', cls: 'diff-hard' }
            };
            const diff = diffMap[q.difficulty] || diffMap.medium;
            this.el.badgeDifficulty.textContent = diff.label;
            this.el.badgeDifficulty.className = `badge-diff ${diff.cls}`;
        }

        if (this.el.streakIndicator) {
            if (this.streakCount >= 2) {
                this.el.streakIndicator.textContent = `🔥 ${this.streakCount}x Benar!`;
                this.el.streakIndicator.classList.remove('hidden');
            } else {
                this.el.streakIndicator.classList.add('hidden');
            }
        }

        const progressPct = ((this.currentIndex + 1) / this.totalQuestions) * 100;
        if (this.el.progressBarFill) {
            this.el.progressBarFill.style.width = `${progressPct}%`;
        }
        if (this.el.textProgress) {
            this.el.textProgress.textContent = `Soal ${this.currentIndex + 1} dari ${this.totalQuestions}`;
        }

        // Media / Illustration slot
        if (q.image) {
            if (this.el.questionMediaBadge) {
                this.el.questionMediaBadge.classList.remove('hidden');
            }
            if (this.el.questionImage) {
                this.el.questionImage.src = q.image;
                this.el.questionImage.alt = q.imageAlt || `Ilustrasi Soal ${this.currentIndex + 1}`;
            }
            if (this.el.questionMediaContainer) {
                this.el.questionMediaContainer.classList.remove('hidden');
            }
        } else {
            if (this.el.questionMediaBadge) {
                this.el.questionMediaBadge.classList.add('hidden');
            }
            if (this.el.questionMediaContainer) {
                this.el.questionMediaContainer.classList.add('hidden');
            }
            if (this.el.questionImage) {
                this.el.questionImage.removeAttribute('src');
                this.el.questionImage.alt = '';
            }
        }

        if (this.el.questionText) {
            this.el.questionText.textContent = q.question;
        }

        // Render A/B/C/D options using .option-card classes defined in style.css
        if (this.el.optionsContainer) {
            this.el.optionsContainer.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];
            q.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'option-card';
                btn.setAttribute('data-index', String(idx));

                const letterSpan = document.createElement('span');
                letterSpan.className = 'option-letter';
                letterSpan.textContent = letters[idx];

                const textSpan = document.createElement('span');
                textSpan.className = 'option-text';
                textSpan.textContent = optText;

                btn.appendChild(letterSpan);
                btn.appendChild(textSpan);
                btn.addEventListener('click', () => this.handleOptionSelect(idx));
                this.el.optionsContainer.appendChild(btn);
            });
        }

        if (window.audioEngine.narrationEnabled) {
            this.speakCurrentQuestion(false);
        }
    }

    /**
     * Read current question via Indonesian TTS
     */
    speakCurrentQuestion(includeOptions = true) {
        const q = this.questionQueue[this.currentIndex];
        if (!q || !this.el.btnListenQuestion) return;

        let text = q.question;
        if (includeOptions) {
            const letters = ['A', 'B', 'C', 'D'];
            const optSpeech = q.options.map((o, i) => `Pilihan ${letters[i]}, ${o}`).join('. ');
            text = `${q.question}. ${optSpeech}`;
        }

        window.audioEngine.speak(
            text,
            () => this.el.btnListenQuestion.classList.add('pulsing'),
            () => this.el.btnListenQuestion.classList.remove('pulsing')
        );
    }

    /**
     * Handle option click, score tracking, SFX, crash-recovery checkpoint, and feedback modal
     */
    handleOptionSelect(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        window.audioEngine.stopSpeaking();

        const q = this.questionQueue[this.currentIndex];
        const isCorrect = selectedIndex === q.answer;

        if (isCorrect) {
            this.streakCount += 1;
            if (this.streakCount >= 3) {
                window.audioEngine.playStreak();
            } else {
                window.audioEngine.playCorrect();
            }
        } else {
            this.streakCount = 0;
            window.audioEngine.playWrong();
        }

        const optionCards = this.el.optionsContainer
            ? this.el.optionsContainer.querySelectorAll('.option-card')
            : [];
        optionCards.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.answer) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        this.answersHistory.push({
            questionId: q.id,
            subBabId: q.subBabId,
            selectedIndex,
            correctIndex: q.answer,
            isCorrect
        });

        // Advance checkpoint immediately so a refresh/crash resumes on next unanswered question
        this.currentIndex += 1;
        this.saveProgress();

        this.showFeedbackModal(q, isCorrect);
    }

    showFeedbackModal(q, isCorrect) {
        if (!this.el.feedbackModal) return;

        if (this.el.feedbackIcon) {
            this.el.feedbackIcon.textContent = isCorrect ? (this.streakCount >= 3 ? '🔥🌟' : '🌟🎉') : '💡📘';
        }
        if (this.el.feedbackTitle) {
            this.el.feedbackTitle.textContent = isCorrect ? 'Hebat! Jawabanmu Benar!' : 'Belum Tepat, Yuk Pelajari!';
            this.el.feedbackTitle.className = `feedback-title ${isCorrect ? 'text-success' : 'text-warm'}`;
        }
        if (this.el.feedbackAppreciation) {
            this.el.feedbackAppreciation.textContent = isCorrect
                ? (q.appreciation || 'Mantap sekali! Teruskan ketelitianmu!')
                : `Jawaban yang benar: ${q.options[q.answer]}`;
        }
        if (this.el.feedbackExplanation) {
            this.el.feedbackExplanation.textContent = q.explanation || '';
        }
        if (this.el.btnNextQuestion) {
            const isLast = this.currentIndex >= this.totalQuestions;
            this.el.btnNextQuestion.textContent = isLast ? 'Lihat Hasil Akhir 🏆' : 'Soal Selanjutnya →';
        }

        this.el.feedbackModal.classList.remove('hidden');
    }

    handleNextQuestion() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        window.audioEngine.playClick();

        if (this.el.feedbackModal) {
            this.el.feedbackModal.classList.add('hidden');
        }

        if (this.currentIndex < this.totalQuestions) {
            this.loadQuestionAtCurrentIndex();
        } else {
            this.finishQuiz();
        }
    }

    /**
     * Calculate 4 sub-bab scores, play engaging calculation animation (no backend jargon), and submit
     */
    async finishQuiz() {
        window.audioEngine.stopSpeaking();
        this.showScreen('calculatingScreen');

        const totalSoal = this.totalQuestions;
        const totalBenar = this.answersHistory.filter((a) => a.isCorrect).length;
        const totalSalah = totalSoal - totalBenar;
        const skor = Math.round((totalBenar / totalSoal) * 100);

        const calcSubBabPct = (subBabId) => {
            const subAnswers = this.answersHistory.filter((a) => a.subBabId === subBabId);
            const expectedTotal = typeof SUBBAB_META !== 'undefined' && SUBBAB_META[String(subBabId)]
                ? SUBBAB_META[String(subBabId)].totalQuestions
                : subAnswers.length || 1;
            const correctCount = subAnswers.filter((a) => a.isCorrect).length;
            return Math.round((correctCount / expectedTotal) * 100);
        };

        const waktuStr = new Date().toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const resultData = {
            nama: this.studentName,
            kelas: this.studentClass,
            skor,
            totalBenar,
            totalSalah,
            totalSoal,
            subBab1Skor: calcSubBabPct(1),
            subBab2Skor: calcSubBabPct(2),
            subBab3Skor: calcSubBabPct(3),
            subBab4Skor: calcSubBabPct(4),
            status: skor >= this.passingScore ? 'Tuntas' : 'Perlu Bimbingan',
            waktu: waktuStr,
            timestamp: new Date().toISOString()
        };

        const stages = [
            { pct: 25, text: 'Memeriksa kelengkapan 30 jawabanmu...' },
            { pct: 55, text: 'Menghitung ketelitian panjang & berat...' },
            { pct: 85, text: 'Menyusun rekap nilai per sub-bab...' },
            { pct: 100, text: 'Menyiapkan piala dan apresiasi!' }
        ];

        const animationPromise = (async () => {
            for (const step of stages) {
                if (this.el.calcProgressFill) this.el.calcProgressFill.style.width = `${step.pct}%`;
                if (this.el.calcStatusText) this.el.calcStatusText.textContent = step.text;
                await this.sleep(360);
            }
        })();

        const submitPromise = window.dbManager.submitQuizResult(resultData);
        await Promise.all([animationPromise, submitPromise]);

        localStorage.removeItem(window.dbManager.IN_PROGRESS_KEY);
        this.pendingResumeState = null;

        this.renderResultScreen(resultData);
        window.audioEngine.playVictory();
    }

    /**
     * Display locked student's previously submitted result without allowing retake
     */
    showExistingResultScreen(existingRecord) {
        const totalBenar = Number(existingRecord.totalBenar) || 0;
        const normalizedRecord = {
            nama: existingRecord.nama,
            kelas: existingRecord.kelas,
            skor: Number(existingRecord.skor) || 0,
            totalBenar,
            totalSalah: Number(existingRecord.totalSalah ?? Math.max(0, 30 - totalBenar)),
            subBab1Skor: Number(existingRecord.subBab1Skor) || 0,
            subBab2Skor: Number(existingRecord.subBab2Skor) || 0,
            subBab3Skor: Number(existingRecord.subBab3Skor) || 0,
            subBab4Skor: Number(existingRecord.subBab4Skor) || 0
        };
        this.renderResultScreen(normalizedRecord);
    }

    /**
     * Render final score screen with 4 sub-bab progress bars and tailored guidance
     */
    renderResultScreen(resultData) {
        this.showScreen('resultScreen');

        if (this.el.resultStudentName) {
            this.el.resultStudentName.textContent = `${resultData.nama} — Kelas ${resultData.kelas}`;
        }
        if (this.el.resultCorrectCount) {
            this.el.resultCorrectCount.textContent = `${resultData.totalBenar}`;
        }
        if (this.el.resultWrongCount) {
            this.el.resultWrongCount.textContent = `${resultData.totalSalah}`;
        }

        const isPassed = resultData.skor >= this.passingScore;
        if (this.el.resultStatusBadge) {
            this.el.resultStatusBadge.textContent = isPassed ? 'TUNTAS KKM 🎉' : 'PERLU BIMBINGAN 💪';
            this.el.resultStatusBadge.className = `status-pill ${isPassed ? 'status-tuntas' : 'status-bimbingan'}`;
        }

        this.animateCounter(this.el.resultScoreNumber, 0, resultData.skor, 900);

        const subItems = [
            { scoreEl: this.el.resultSub1Score, barEl: this.el.resultSub1Bar, val: resultData.subBab1Skor, name: 'Alat Ukur Panjang' },
            { scoreEl: this.el.resultSub2Score, barEl: this.el.resultSub2Bar, val: resultData.subBab2Skor, name: 'Satuan Panjang Baku' },
            { scoreEl: this.el.resultSub3Score, barEl: this.el.resultSub3Bar, val: resultData.subBab3Skor, name: 'Alat Ukur Berat' },
            { scoreEl: this.el.resultSub4Score, barEl: this.el.resultSub4Bar, val: resultData.subBab4Skor, name: 'Satuan Berat & Cerita' }
        ];

        subItems.forEach((item) => {
            const pct = Math.max(0, Math.min(100, Number(item.val) || 0));
            if (item.scoreEl) item.scoreEl.textContent = `${pct}%`;
            if (item.barEl) {
                item.barEl.style.width = '0%';
                setTimeout(() => {
                    item.barEl.style.width = `${pct}%`;
                }, 120);
            }
        });

        if (this.el.resultAdvice) {
            const sorted = [...subItems].sort((a, b) => a.val - b.val);
            const weakest = sorted[0];
            if (resultData.skor >= 90) {
                this.el.resultAdvice.textContent = 'Luar biasa! Kamu sangat teliti membaca alat ukur panjang maupun berat dan lancar mengonversi satuannya. Pertahankan prestasimu!';
            } else if (isPassed) {
                this.el.resultAdvice.textContent = `Hebat, kamu sudah Tuntas KKM! Supaya makin sempurna, yuk latih lagi bagian "${weakest.name}" (${weakest.val}%).`;
            } else {
                this.el.resultAdvice.textContent = `Tetap semangat belajar! Coba perhatikan kembali skala penggaris serta jarum timbangan, terutama di bagian "${weakest.name}" (${weakest.val}%).`;
            }
        }

        if (isPassed) {
            this.launchConfetti();
        }
    }

    /**
     * Teacher PIN Modal Handlers (Zero PIN literals leaked in DOM or error text)
     */
    openPinModal() {
        window.audioEngine.playClick();
        if (this.el.teacherPinInput) {
            this.el.teacherPinInput.value = '';
        }
        if (this.el.teacherPinError) {
            this.el.teacherPinError.classList.add('hidden');
            this.el.teacherPinError.textContent = '';
        }
        if (this.el.teacherPinModal) {
            this.el.teacherPinModal.classList.remove('hidden');
        }
        setTimeout(() => {
            if (this.el.teacherPinInput) this.el.teacherPinInput.focus();
        }, 80);
    }

    closePinModal() {
        if (this.el.teacherPinModal) {
            this.el.teacherPinModal.classList.add('hidden');
        }
    }

    handleKeypadInput(keyVal) {
        if (!this.el.teacherPinInput) return;
        const current = this.el.teacherPinInput.value || '';
        if (keyVal === 'C') {
            this.el.teacherPinInput.value = '';
        } else if (keyVal === 'DEL') {
            this.el.teacherPinInput.value = current.slice(0, -1);
        } else if (/^\d$/.test(keyVal) && current.length < 4) {
            this.el.teacherPinInput.value = current + keyVal;
        }
    }

    async handleVerifyPin() {
        window.audioEngine.playClick();
        const pin = (this.el.teacherPinInput ? this.el.teacherPinInput.value : '').trim();
        if (!pin) {
            this.showPinError('Masukkan 4 digit PIN terlebih dahulu.');
            return;
        }

        if (!window.dbManager.verifyTeacherPin(pin)) {
            window.audioEngine.playWrong();
            this.showPinError('PIN salah! Silakan periksa kembali.');
            if (this.el.teacherPinInput) {
                this.el.teacherPinInput.value = '';
                this.el.teacherPinInput.focus();
            }
            return;
        }

        this.activeTeacherPin = pin;
        this.closePinModal();
        this.showScreen('teacherScreen');
        await this.refreshTeacherData();
    }

    showPinError(message) {
        if (!this.el.teacherPinError) return;
        this.el.teacherPinError.textContent = message;
        this.el.teacherPinError.classList.remove('hidden');
    }

    /**
     * Teacher Dashboard: fetch 1:1 SSoT submissions and render stats + 12-col table
     */
    async refreshTeacherData() {
        if (this.el.btnRefreshTeacher) {
            this.el.btnRefreshTeacher.disabled = true;
            this.el.btnRefreshTeacher.textContent = '⏳ Memuat...';
        }

        try {
            const submissions = await window.dbManager.getTeacherDashboardData(this.activeTeacherPin);
            this.cachedTeacherSubmissions = Array.isArray(submissions) ? submissions : [];
            this.renderTeacherDashboardTable();
        } catch (err) {
            console.error('Gagal memuat dasbor guru:', err);
        } finally {
            if (this.el.btnRefreshTeacher) {
                this.el.btnRefreshTeacher.disabled = false;
                this.el.btnRefreshTeacher.textContent = '🔄 Segarkan Data';
            }
        }
    }

    getCurrentlyFilteredTeacherData() {
        const filterAll = !this.currentClassFilter || this.currentClassFilter === 'Semua' || this.currentClassFilter === 'ALL';
        const q = this.currentSearchQuery.toLowerCase();

        return this.cachedTeacherSubmissions.filter((item) => {
            const matchesClass = filterAll || String(item.kelas || '').toUpperCase() === this.currentClassFilter.toUpperCase();
            const matchesSearch = !q ||
                (item.nama || '').toLowerCase().includes(q) ||
                (item.kelas || '').toLowerCase().includes(q);
            return matchesClass && matchesSearch;
        });
    }

    renderTeacherDashboardTable() {
        const filteredData = this.getCurrentlyFilteredTeacherData();
        const stats = window.exportEngine.calculateStats(filteredData);

        if (this.el.teacherStatTotal) this.el.teacherStatTotal.textContent = stats.total;
        if (this.el.teacherStatAvg) this.el.teacherStatAvg.textContent = stats.avg;
        if (this.el.teacherStatHighest) this.el.teacherStatHighest.textContent = stats.highest;
        if (this.el.teacherStatLowest) this.el.teacherStatLowest.textContent = stats.lowest;
        if (this.el.teacherStatPassed) this.el.teacherStatPassed.textContent = `${stats.passed} / ${stats.total}`;

        // Compute average accuracy per Bab 3 sub-bab across filtered rows
        const avgSub = (field) => {
            if (!filteredData.length) return 0;
            const sum = filteredData.reduce((acc, row) => acc + (Number(row[field]) || 0), 0);
            return Math.round(sum / filteredData.length);
        };

        const subDomPairs = [
            { statEl: this.el.teacherSub1Stat, barEl: this.el.teacherSub1Bar, val: avgSub('subBab1Skor') },
            { statEl: this.el.teacherSub2Stat, barEl: this.el.teacherSub2Bar, val: avgSub('subBab2Skor') },
            { statEl: this.el.teacherSub3Stat, barEl: this.el.teacherSub3Bar, val: avgSub('subBab3Skor') },
            { statEl: this.el.teacherSub4Stat, barEl: this.el.teacherSub4Bar, val: avgSub('subBab4Skor') }
        ];

        subDomPairs.forEach(({ statEl, barEl, val }) => {
            const pct = Math.max(0, Math.min(100, Number(val) || 0));
            if (statEl) statEl.textContent = `${pct}%`;
            if (barEl) barEl.style.width = `${pct}%`;
        });

        if (!this.el.teacherTableBody) return;

        if (filteredData.length === 0) {
            this.el.teacherTableBody.innerHTML = `
                <tr>
                    <td colspan="12" style="text-align: center; padding: 28px 16px; color: var(--slate-500); font-weight: 600;">
                        Belum ada data nilai siswa untuk filter ini.
                    </td>
                </tr>
            `;
            return;
        }

        // 12 columns strictly matching <thead>:
        // No | Nama Siswa | Kelas | Skor | Benar | Salah | Sub A | Sub B | Sub C | Sub D | Waktu Selesai | Status
        const rowsHtml = filteredData.map((row, idx) => {
            const skor = Number(row.skor) || 0;
            const passed = skor >= this.passingScore;
            const statusText = passed ? 'Tuntas' : 'Perlu Bimbingan';
            const statusClass = passed ? 'status-tuntas' : 'status-bimbingan';
            const totalBenar = Number(row.totalBenar) || 0;
            const totalSalah = Number(row.totalSalah ?? Math.max(0, 30 - totalBenar));
            const timeDisplay = row.waktu || this.formatTimestamp(row.timestamp);

            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td style="font-weight: 700; color: var(--slate-900); text-align: left;">${this.escapeHtml(row.nama || '-')}</td>
                    <td>${this.escapeHtml(row.kelas || '-')}</td>
                    <td><strong>${skor}</strong></td>
                    <td>${totalBenar}</td>
                    <td>${totalSalah}</td>
                    <td>${row.subBab1Skor ?? 0}%</td>
                    <td>${row.subBab2Skor ?? 0}%</td>
                    <td>${row.subBab3Skor ?? 0}%</td>
                    <td>${row.subBab4Skor ?? 0}%</td>
                    <td>${this.escapeHtml(timeDisplay)}</td>
                    <td><span class="status-pill ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        }).join('');

        this.el.teacherTableBody.innerHTML = rowsHtml;
    }

    /**
     * GAS Settings Modal
     */
    openGasModal() {
        window.audioEngine.playClick();
        if (this.el.gasUrlInput) {
            this.el.gasUrlInput.value = window.dbManager.getGasUrl() || '';
        }
        if (this.el.gasSettingsModal) {
            this.el.gasSettingsModal.classList.remove('hidden');
        }
    }

    closeGasModal() {
        if (this.el.gasSettingsModal) {
            this.el.gasSettingsModal.classList.add('hidden');
        }
    }

    async handleSaveGasUrl() {
        window.audioEngine.playClick();
        const url = (this.el.gasUrlInput ? this.el.gasUrlInput.value : '').trim();
        window.dbManager.setGasUrl(url);
        this.closeGasModal();
        await this.refreshTeacherData();
    }

    /**
     * UI Utility Helpers
     */
    showScreen(targetKey) {
        const screenKeys = ['welcomeScreen', 'quizScreen', 'calculatingScreen', 'resultScreen', 'teacherScreen'];
        screenKeys.forEach((key) => {
            const node = this.el[key];
            if (!node) return;
            const isTarget = key === targetKey;
            node.classList.toggle('hidden', !isTarget);
            node.classList.toggle('active', isTarget);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateAudioButtonsUI() {
        if (this.el.btnToggleSfx) {
            const on = window.audioEngine.sfxEnabled;
            this.el.btnToggleSfx.textContent = on ? '🔊 Efek: ON' : '🔇 Efek: OFF';
            this.el.btnToggleSfx.classList.toggle('active', on);
        }
        if (this.el.btnToggleNarration) {
            const on = window.audioEngine.narrationEnabled;
            this.el.btnToggleNarration.textContent = on ? '🗣️ Narasi: ON' : '🤫 Narasi: OFF';
            this.el.btnToggleNarration.classList.toggle('active', on);
        }
    }

    animateCounter(element, start, end, durationMs) {
        if (!element) return;
        const startTs = performance.now();
        const tick = (now) => {
            const elapsed = now - startTs;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(start + (end - start) * eased);
            element.textContent = String(value);
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    }

    launchConfetti() {
        const colors = ['#0284c7', '#fbbf24', '#16a34a', '#ec4899', '#8b5cf6'];
        for (let i = 0; i < 28; i++) {
            const piece = document.createElement('span');
            piece.setAttribute('aria-hidden', 'true');
            piece.style.cssText = [
                'position: fixed',
                'top: -16px',
                `left: ${Math.random() * 100}%`,
                'width: 10px',
                'height: 10px',
                'border-radius: 3px',
                `background: ${colors[i % colors.length]}`,
                'pointer-events: none',
                'z-index: 9999'
            ].join(';');
            document.body.appendChild(piece);

            const driftX = (Math.random() - 0.5) * 180;
            const rot = Math.random() * 540;
            if (typeof piece.animate === 'function') {
                piece.animate(
                    [
                        { transform: 'translate3d(0, 0, 0) rotate(0deg)', opacity: 1 },
                        { transform: `translate3d(${driftX}px, 100vh, 0) rotate(${rot}deg)`, opacity: 0.15 }
                    ],
                    {
                        duration: 1800 + Math.random() * 1000,
                        delay: Math.random() * 350,
                        easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)',
                        fill: 'forwards'
                    }
                );
            }
            setTimeout(() => piece.remove(), 3300);
        }
    }

    normalizeName(str) {
        return String(str || '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    formatTimestamp(ts) {
        if (!ts) return '-';
        try {
            const d = new Date(ts);
            if (Number.isNaN(d.getTime())) return String(ts);
            return d.toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return String(ts);
        }
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});
