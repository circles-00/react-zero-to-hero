node {

    stage('Checkout SCM') {
        checkout scm
    }

//      if (env.BRANCH_NAME == 'setup-cd-ci' ) {
        withEnv(["DB_USER=postgres",
                "DB_PASSWORD=manigli1",
                "DB_HOST=db",
                "DB_PORT=5432",
                "DB_DATABASE=dnic_proektna",
                "RUN_MIGRATIONS=true",
                "JWT_SECRET=YOwSWIOCp8uzTRVB0FpmyHFshinkFRdNI0RmRmghlGzEtcDJWIPdhcKRVvbpSTr94chWiU8T9egBNVyc5QKKXukAiwb5TTP1VzaLcxYNVQPDOacKLxP2NKxDmy6FkLbo",
                "GOOGLE_CLIENT_ID=590982768530-k96q1m488u555eoeeos5p56fdcq03dhg.apps.googleusercontent.com",
                "REACT_APP_GOOGLE_CLIENT_ID=590982768530-k96q1m488u555eoeeos5p56fdcq03dhg.apps.googleusercontent.com",
                "GOOGLE_CLIENT_SECRET=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",
                "GITHUB_CLIENT_ID=2c75bb25394b67e645fc",
                "GITHUB_CLIENT_SECRET=80bd981c63ebd8f57111a1e8fb35cc63c8ee2c94",
                "REACT_APP_GITHUB_CLIENT_ID=2c75bb25394b67e645fc",
                "GENERATE_SOURCEMAP=false",
                "MAIL_HOST=smtp.gmail.com",
                "MAIL_USER=contact.react.zero.hero@gmail.com",
                "MAIL_PASSWORD=Manigli1",
                "MAIL_APP_PASSWORD=ltlzivddzabeowxg",
                "PORT_NUMBER=5000",
                "NODE_ENV=production",
                "MODE=production"
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
