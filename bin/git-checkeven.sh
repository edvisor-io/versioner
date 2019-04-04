#!/bin/sh

# git-checkeven.sh
#
# Check whether two revisions are even, and, otherwise, to what extent
# the first revision is ahead of / behind the second revision
#
# Usage: git checkeven <revA> <revB>
#
# To make a Git alias called 'checkeven' out of this script,
# put the latter on your search path, and run
#
#   git config --global alias.checkeven '!sh git-checkeven.sh'

if [ $# -ne 2 ]; then
    printf "usage: git checkeven <revA> <revB>\n\n"
    exit 2
fi

revA=$1
revB=$2

nA2B=$(git rev-list --count $revA..$revB)
nB2A=$(git rev-list --count $revB..$revA)

if [ $nA2B -eq 0 -a $nB2A -eq 0 ]; then
  # printf "$revA is even with $revB\n"
  printf "even"
  exit 0
elif [ $nA2B -gt 0 ]; then
  # printf "$revA is $nA2B commits behind $revB\n"
  printf "behind"
  exit 0
else
  # printf "$revA is $nB2A commits ahead of $revB\n"
  printf "ahead"
  exit 0
fi
