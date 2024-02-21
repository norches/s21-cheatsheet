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
    cp "materials/linters/.clang-format" "src/"
    cd "src"
    git fetch --all
    git checkout develop
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
  gcc -Wall -Werror -Wextra $1 -lm -lncurses || return
  ./a.out
  rm -rf a.out
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
