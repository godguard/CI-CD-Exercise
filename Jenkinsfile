pipeline {
    agent any

    environment {
        NODE_VERSION = '22' // Documented, but not used without nvm
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
                // Start app in background without blocking Jenkins
                bat 'start /B npm start'
                // Give app time to start
                timeout(time: 5, unit: 'SECONDS')
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
            echo 'Stopping Node.js app if still running...'
            // Kill process using port 8081 (adjust if needed)
            bat 'for /f "tokens=5" %a in (\'netstat -aon ^| findstr :8081 ^| findstr LISTENING\') do taskkill /F /PID %a'
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
