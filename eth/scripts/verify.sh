#!/bin/sh

declare -a addresses=(
    "Hello"
    "World"
)

cd ..

for addr in "${addresses[@]}"
do
	npm run verify-rinkeby $addr
done