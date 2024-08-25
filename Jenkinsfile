pipeline{
  agent any 

  stages {
    stage("build"){
      steps {
        echo 'executing npm...'
        nodejs('NodeJS-22-7-0') {
          sh 'npm install'
        }
      }
    }

    stage("test"){
      steps {
        echo 'executing test...'
        nodejs('NodeJS-22-7-0') {
          sh 'npm test'
        }
      }
    }
  }
}
