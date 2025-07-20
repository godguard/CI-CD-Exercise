pipeline {
    agent any

    environment {
        NODE_VERSION = '22' // Adjust Node version as needed
    }

    tools {
        nodejs "${NODE_VERSION}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting application...'
                sh 'npm start &'
                sleep time: 5, unit: 'SECONDS' // give it time to boot up (adjust as needed)
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'kill $(lsof -t -i:3000) || true' // example to kill app running on port 3000
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
