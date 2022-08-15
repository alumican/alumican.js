#!/bin/sh

install () {
    node install.js && npm install;
}

uninstall () {
    rm -r -f node_modules && rm -f package-lock.json && rm -f ../tsconfig.json && rm -r -f tmp;
}

if [ $# -ge 1 ]; then
    if [ $1 = "install" ]; then
        # install node modules
        (cd build && install);
    elif [ $1 = "uninstall" ]; then
        # remove node modules, package-lock.json, tmp directory
        (cd build && uninstall);
    elif [ $1 = "project" ]; then
        if [ $# -eq 2 ]; then
            (cd build && npm run gulp project-$2);
        else
            echo "Project name is need.\n/build.sh project PROJECT_NAME";
        fi
    else
        # run gulp task
        (cd build && npm run gulp $1);
    fi
else
    if [ -e "build/node_modules" ]; then
        # run gulp default task
        (cd build && npm run gulp);
    else
        # install
        (cd build && install && npm run gulp);
    fi
fi
