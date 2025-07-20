pipeline {
    agent any

    environment {
        NODE_VERSION = '22' // Specify the Node.js version
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set Up Node.js') {
            steps {
                script {
                    // Use Node.js version manager if available
                    sh "nvm install ${NODE_VERSION} || true"
                    sh "nvm use ${NODE_VERSION} || true"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start App') {
            steps {
                sh 'npm start'
            }
        }

        stage('Run Tests') {
            steps {
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
            echo 'Build failed.'
        }
    }
}
