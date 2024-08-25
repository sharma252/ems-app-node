pipeline{
  agent any 

  stages {
    stage("build"){
      steps {
        echo 'executing npm...'
        nodejs('Node-22.7.0') {
          sh 'npm install'
        }
      }
    }

    stage("test"){
      steps {
        echo 'executing test...'
        nodejs('Node-22.7.0') {
          sh 'npm test'
        }
      }
    }
  }
}
