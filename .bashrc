wreview() {
  # Clone the repository with 'develop' branch
  cd ~
  if [[ -n "$1" ]]; then
    echo "Removing and recreating the 'review' folder..."
    rm -rf review
    mkdir review
    cd review
    echo "Cloning the repository from '$1'..."
    git clone $1 "code"
    cd "code"
    git fetch --all
    git checkout develop
    cp "materials/linters/.clang-format" "src/"
    cd "src"
    code -n .
  else
    echo "Repository URL not provided."
  fi
}

wgclone() {
  # Clone
  cd ~
  if [[ -n "$1" ]]; then
    echo "Cloning the repository from '$1'..."
    git clone $1
    repoName=$(basename -s .git "$1")
    cd "$repoName"
    cp "materials/linters/.clang-format" "src/"
    git fetch --all
    git checkout develop
    git checkout -b develop
    git push -u origin develop
    code -n .
  else
    echo "Repository URL not provided."
  fi
}

wgcc() {
  rm -rf a.out
  gcc -Wall -Werror -Wextra "$1" -lm -lncurses || return
  local skip_run='false'
  local keep_flag='false'

  # Shift after processing the first argument to start processing flags
  shift

  # Process optional flags
  while [ -n "$1" ]; do  # Loop through all remaining arguments
      case "$1" in
          --keep|-k)
              keep_flag='true'  # Set the flag to true if --keep or -k is found
              ;;
          --skip-run|-s)
              skip_run='true'  # Set the flag to true if --skip-run or -s is found
              ;;
          *)
              echo "Unknown option: $1"
              return 1
              ;;
      esac
      shift  # Move to the next argument
  done

  if [ "$skip_run" = 'false' ]; then
    ./a.out
  fi

  if [ "$keep_flag" = 'false' ]; then
      rm -rf a.out
  fi
}

wclang() {
  clang-format -n -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" *.c
  clang-format -i -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" *.c
}

wclangfile() {
  clang-format -n -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" "$1"
  clang-format -i -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" "$1"
}


wvalg() {
  rm -rf a.out

  wgcc $1 -k -s
  valgrind --tool=memcheck --leak-check=yes ./a.out
  rm -rf a.out
}

wcppck() {
  cppcheck --enable=all --suppress=missingIncludeSystem
}

wfixchrome() {
  rm -rf ~/.config/google-chrome/Singleton*
}
