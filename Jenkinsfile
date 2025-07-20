pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Specify Node.js version (for documentation)
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node.js') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting application in background...'
                // Start app without blocking Jenkins
                bat 'start /B npm start'
                // Wait for 5 seconds to let app start
                timeout(time: 10, unit: 'SECONDS') {
                    bat 'ping -n 6 127.0.0.1 > nul'  // sleep approx 5 seconds on Windows
                }
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Stopping Node.js app if running...'
            // Kill process listening on port 8081 (adjust port as needed)
            bat '''
            for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081 ^| findstr LISTENING') do taskkill /F /PID %%a
            '''
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
