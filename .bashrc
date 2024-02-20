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
    cd "src"
    git fetch --all
    git checkout develop
  else
    echo "Repository URL not provided."
  fi
}

wgcc() {
  gcc -Wall -Werror -Wextra $1 -lm -lncurses
  ./a.out
}

wclang() {
  clang-format -n -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" $1
  clang-format -i -style="{BasedOnStyle: Google, IndentWidth: 4, ColumnLimit: 110}" $1
}

wvalg() {
  valgrind --tool=memcheck --leak-check=yes $1
}

wcppck() {
  cppcheck --enable=all --suppress=missingIncludeSystem
}

wfixchrome() {
  rm -rf ~/.config/google-chrome/Singleton*
}
