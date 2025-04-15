
pipeline {
    agent any

    environment {
        PROJECT_ID = "swe645-hw3-456321"
        FRONTEND_IMAGE = "us-east1-docker.pkg.dev/swe645-hw3-456321/frontend-repo/frontend:latest"
        BACKEND_IMAGE = "us-east1-docker.pkg.dev/swe645-hw3-456321/backend-repo/backend:latest"
        CLUSTER_NAME = "swe645-cluster"
        CLUSTER_ZONE = "us-east1-b"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Harsha13-os/survey-app', branch:'main'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build --prod'
                    sh 'gcloud auth configure-docker us-east1-docker.pkg.dev --quiet'
                    sh 'docker buildx build --platform=linux/amd64 -t $FRONTEND_IMAGE --push .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                    sh 'gcloud auth configure-docker us-east1-docker.pkg.dev --quiet'
                    sh 'docker buildx build --platform=linux/amd64 -t $BACKEND_IMAGE --push .'
                }
            }
        }

        stage('Deploy to GKE') {
            steps {
                sh 'gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE --project $PROJECT_ID'
                sh 'kubectl set image deployment/frontend-deployment frontend=$FRONTEND_IMAGE'
                sh 'kubectl set image deployment/backend-deployment backend=$BACKEND_IMAGE'
            }
        }
    }
}
