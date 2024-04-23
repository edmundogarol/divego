#!/bin/bash

# ENV_FILE="./docker/compose/.env"

# if [ -f "$ENV_FILE" ]; then
#   source "$ENV_FILE"
# else
#   echo "The .env file was not found at $ENV_FILE."
#   exit 1
# fi

# if [ -z "$NODE_VERSION" ]; then
#   echo "NODE_VERSION is not set in the .env file."
#   exit 1
# fi

# readonly REQUIRED_NODE_VERSION="$NODE_VERSION"
# readonly REQUIRED_POD_VERSION="1.15"
# readonly REQUIRED_JAVA_VERSION=17

# target_flag=false
# TYPE=""

while getopts ":t:" opt; do
  case "$opt" in
    t)
      case "$OPTARG" in
        web | ios | android | all)
          TYPE=$OPTARG
          target_flag=true
          ;;
        *)
          echo "Invalid type: $OPTARG. Allowed types are [web|ios|android|all]" >&2
          exit 1
          ;;
      esac
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

if ! $target_flag; then
  echo "Error: The -t option is required."
  exit 1
fi

# is_program_installed() {
#   type "$1" > /dev/null 2>&1
# }

# is_pod_installed_and_updated() {
#   which pod > /dev/null 2>&1 && [[ "$(pod --version)" =~ ^([0-9]+\.){2}[0-9]+$ ]] \
#     && [[ "$(printf '%s\n' "$(pod --version)" "$REQUIRED_POD_VERSION" | sort -V | head -n1)" = "$REQUIRED_POD_VERSION" ]]
# }

# is_node_version_correct() {
#   node --version 2> /dev/null | grep -q "^v${REQUIRED_NODE_VERSION}\$"
# }

# install_nodejs() {
#   if is_program_installed nvm; then
#     echo 'nvm can be a conflict with volta. Please consider removing it first'
#     exit 1
#   fi

#   if ! is_program_installed volta; then
#     echo 'Installing volta...'
#     curl https://get.volta.sh | bash
#   fi

#   if ! is_node_version_correct; then
#     echo "Installing Node.js v$REQUIRED_NODE_VERSION"
#     volta install "node@$REQUIRED_NODE_VERSION"

#     echo "Pinning to Node.js v$REQUIRED_NODE_VERSION"
#     volta pin "node@$REQUIRED_NODE_VERSION"
#   fi
# }

# install_brew_and_watchman() {
#   if ! is_program_installed brew; then
#     echo 'Installing brew...'
#     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#   else
#     brew update
#   fi

#   if ! is_program_installed watchman; then
#     echo 'Installing watchman...'
#     brew install watchman
#   fi
# }

prepare_ios() {
  echo 'Preparing iOS Environment...'

  # if ! is_pod_installed_and_updated; then
  #   echo 'Installing or updating cocoapods...'
  #   sudo gem install cocoapods
  # fi

  cd divego_rn
  
  # Clean
  xattr -w com.apple.xcode.CreatedByBuildSystem true ios/build
  rm -rf ios/Pods ios/Podfile.lock ios/build
  rm -rf ~/Library/Developer/Xcode/DerivedData/
  yarn clean-ios
  yarn cache clean
  
  # Prepare
  yarn pods
  
  yarn start
}

# prepare_android() {
#   echo 'Preparing Android Environment...'

#   CURRENT_JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | sed -E 's/([0-9]+)\.([0-9]+).*/\1/')
#   if ! is_program_installed java || [ "$CURRENT_JAVA_VERSION" -lt "$REQUIRED_JAVA_VERSION" ]; then
#     echo "Installing JDK ${REQUIRED_JAVA_VERSION}..."
#     brew tap homebrew/cask-versions
#     brew install --cask "zulu${REQUIRED_JAVA_VERSION}"
#     NEW_JAVA_HOME="export JAVA_HOME=\"/Library/Java/JavaVirtualMachines/zulu-${REQUIRED_JAVA_VERSION}.jdk/Contents/Home\""

#     if grep -q 'export JAVA_HOME' ~/.bash_profile; then
#       sed -i '' -E 's|^export[ \t]+JAVA_HOME=.*$|'"$NEW_JAVA_HOME"'|' ~/.bash_profile
#     else
#       echo "$NEW_JAVA_HOME" >> ~/.bash_profile
#     fi
#   fi

#   rm -rf android/app/build
# }

# prepare_web() {
#   echo 'Preparing Web Environment...'
# }

prepare_target_environment() {
  case $TYPE in
    web)
      prepare_web
      ;;
    ios)
      prepare_ios
      ;;
    android)
      prepare_android
      ;;
    all)
      prepare_web
      prepare_ios
      prepare_android
      ;;
    *)
      echo "Invalid type: $TYPE"
      echo "Usage: $0 -t [web|ios|android|all]"
      exit 1
      ;;
  esac
}

# install_brew_and_watchman
# install_nodejs

prepare_target_environment

echo 'Done!'
