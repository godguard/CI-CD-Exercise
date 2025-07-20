pipeline {
    agent any

    environment {
        NODE_VERSION = '22'
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

        stage('Start App') {
            steps {
                echo 'Starting Node.js app in background...'
                bat 'start /B npm start'
                sleep time: 5, unit: 'SECONDS'
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
            echo 'Stopping app on port 8081...'
            bat 'for /f "tokens=5" %%a in (\'netstat -aon ^| findstr :8081 ^| findstr LISTENING\') do taskkill /F /PID %%a'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
