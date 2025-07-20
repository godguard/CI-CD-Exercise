pipeline {
    agent any

    environment {
        NODE_VERSION = '22'
        APP_PORT = '8081'  // Change this if your app uses a different port
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
                bat 'start /B npm start'
                // Wait ~5 seconds to let app start
                timeout(time: 10, unit: 'SECONDS') {
                    bat 'ping -n 6 127.0.0.1 > nul'
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
            echo "Stopping app if running on port ${env.APP_PORT}..."
            bat '''
            for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%APP_PORT% ^| findstr LISTENING') do (
                taskkill /F /PID %%a || exit 0
            )
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
