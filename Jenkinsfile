pipeline {
    agent any

    environment {
        NODE_VERSION = '18' // Specify the Node.js version
        APP_PORT = '8080'   // Default port for the application
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
                    // Install Node.js using nvm or ensure it's pre-installed
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash'
                    sh '. ~/.nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                script {
                    // Start the application in the background
                    sh 'PORT=${APP_PORT} nohup npm start &'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests after ensuring the app is running
                    sh 'npm test'
                }
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
