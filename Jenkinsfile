pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18' // Make sure Jenkins has this tool name configured under "Global Tool Configuration"
    }

    environment {
        // Example: Set environment variables if needed
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting application...'
                sh 'npm run start &'
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
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
