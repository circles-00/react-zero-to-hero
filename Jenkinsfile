node {

    stage('Checkout SCM') {
        checkout scm
    }

//      if (env.BRANCH_NAME == 'setup-cd-ci' ) {
        withEnv(['DATABASE_URL=postgres://postgres:123123@db:5432/dnic_proektna',
                "JWT_SECRET=txD1xNdEWgDbQMpq7qo5WmPqf1o",
                "DB_USER=postgres",
                "DB_PASSWORD=123123",
                "DB_DATABASE=dnic_proektna",
                "DB_PORT=5432",
                "PORT_NUMBER=5000",
                "NODE_ENV=production"
                ]) {
            stage('Build Docker Image') {
                sh "echo GENERATE_SOURCEMAP=false >> ./client/.env"
                // This is how to pass env vars to react app
                // sh "echo REACT_APP_BASIC_PLAN=prod_J6nacLN9dY0Th4 >> ./client/.env"

                sh "docker compose build"
            }
            try {
                stage("Production - deployment - branch: ${env.BRANCH_NAME}"){
                    sh "./jenkins/deploy.sh"
                }
            } finally {
                archiveArtifacts artifacts: 'logs-*.txt'
            }
        }
//     }
}
