#!groovy

node {

    def GIT_USER = "red-panda-ci"
    def GIT_REPO = "generator-redpanda-node-module"
    def GIT_BRANCH = env.BRANCH_NAME
    def GIT_TOKEN =  env.GIT_TOKEN
    def NPM_TOKEN = env.NPM_TOKEN

    stage("checkout SCM"){
      checkout scm
    }

    stage("Make Tests"){
      sh "./bin/CI/test.sh ${GIT_USER} ${GIT_REPO} ${GIT_BRANCH} ${GIT_TOKEN}"
    }

    stage("publish Reports"){
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: false, reportDir: "./coverage/lcov-report",
        reportFiles: "index.html",
        reportName: "Coverage Report"
      ])
    }

    if( env.BRANCH_NAME ==~ /.*release.*/ ){

        def PACKAGE_VERSION = sh (script: "./bin/CI/get-release.sh ${GIT_BRANCH}", returnStdout: true)

        stage("Publish package"){
          sh "./bin/CI/publish.sh ${GIT_USER} ${GIT_REPO} ${GIT_BRANCH} ${GIT_TOKEN} ${NPM_TOKEN} ${PACKAGE_VERSION}"
        }

    }
}
