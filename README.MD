# VS Code Haxe Template

This Template is designed to ease programming with [HaxeLang](https://haxe.org) in [Visual Studio Code](https://code.visualstudio.com).
It uses the VSCode Extension [Legacy Haxe](https://marketplace.visualstudio.com/items?itemName=haxedevs.haxe) by Haxe Devs.
For this to work, this Template assumes you to install all recommended extensions, so everything 'just runs'.
Also you can extend it by upcomming haxelib language extensions, by adding a line to the ```Build.hxml``` file.

## Features

* Predefined Tasks for a set of Targets. [[Tasks]](#tasks)
* Per-Target Includes [[Includes]](#per-target-includes)
* easy to extend [[Adding a Target]](#adding-build-targets)

## Requirements

First of all (for the obvious) you need a working installation of [Visual Studio Code](https://code.visualstudio.com).
Also you will need:

* [Haxe](https://haxe.org/)
* [NodeJS](https://nodejs.org/)

If you are running Linux or Mac OS, [Mono](www.mono-project.com/download/) will be required for execution of some targets.

By default all Build Targets are enabled, so if you want to successfully compile, you might want to [disable build targets](#disabling-build-targets).

If you want to run and debug PHP code, you will also need:

* [PHP CLI](php.net/downloads.php)
* ["PHP Debug" VSCode Extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)

Please Note, that all referenced requirements might also require thirdparty software.

## Tasks

By default there are predifened Launch Configurations.
Available Tasks are:

* Launch Compiled HAXE (AS)
* Launch Compiled HAXE (C++)
* Launch Compiled HAXE (C#)
* Launch Compiled HAXE (JAVA)
* Launch Compiled HAXE (JS)
* Launch Compiled HAXE (LUA)
* Launch Compiled HAXE (NEKO)
* Launch Compiled HAXE (PHP)
* Launch Compiled HAXE (PYTHON)
* Launch Compiled HAXE (SWF)

These Configurations will be run by NodeJS.
Exceptions:

* PHP[[1]](#php)
* ActionScript3[[2]](#external-software-needed)
* SWF[[2]](#external-software-needed)

Also JS Task will be run in NodeJS since if you wanted to debug it, you should open it manually in a browser of your choice.

## Per-Target Includes

Every Target by default has a directory for target specific includes.
So if you need something included only for e.g. ```Java``` you can put it in ```targets/java/``` folder in your workspace root.
These files will be automatically included by Haxe compiler.

## Installation

To successfully use this Template you will need to some easy steps.
Before we get into the "console stuff", we need to install Haxe and Visual Studio Code.
After that we get into the console and install our haxe libraries we need for our desired targets.

E.g. for C# and java we need to type:

```console
$ haxelib install hxcs
[...]
Done

$ haxelib install hxjava
[...]
Done
```

Yeah! That was easy, wasn't it?

Now you can close the console, we won't need it for the next steps.

## Configuration

After installation of all requirements for your needs, we will now configure your workspace.
There isn't much to do, except for those who don't want to compile every target.
If you want to add a target, jump to section [Adding a Target](#adding-build-targets).
If you dont need or dont want a specific target simply [disable it](#disabling-build-targets) in ```targets.json```.
If you want to add a library to your target, jump to section [Adding a Library to a Target](#adding-a-library-to-a-target).

## Compilation

Compilation takes place in ```${WorkspaceRoot}/buld/<platform>/```

So for example Compilation of ```JS``` will be stored in ```${WorkspaceRoot}/buld/js/```

### Adding Build Targets

To add a build target, basically there is only to add it in a file named as your target + ".hxml" in directory hxml.
If you want to add it like this Template does, do the following:

First open up ```hxml/<mytarget>.hxml``` and add your target as following

```code
# My Target
    -cp targets/<mytarget>
    -<target> build/<target>
    --next
```

save it and activate it by adding its name into ```targets.json```.

As you might have noticed, there isn't a ```targets/<mytarget>``` directory in your workspace, so create it.

(Optional)
Now open up ```.vscode/launch.json``` and add a new launch configuration.

```code
{
    "name": "Launch compiled HAXE (<mytarget>)",
    "type": "node",
    "request": "launch",
    "preLaunchTask": "build",
    "program": "${workspaceRoot}/.vscode/runner.js",
    "args": ["${workspaceRoot}/build/<mytarget>/<myexecutable>"],
    "cwd": "${workspaceRoot}/build/<mytarget>/<basepath of executable>"
}
```

please change ```<myexecutable>``` and ```<mytarget>``` to your target.

### Adding a Library to a Target

If you want to use a library for your target, simply append it by editing your target file
(```hxml/<mytarget>```)

```code
# My Target
    -cp targets/<mytarget>
    -<target> build/<target>
    -lib <mylib>
    --next
```

### Disabling Build Targets

To disable a buld target, simply open your ```tagets.json``` file on the root of your workspace 
and comment out that target or remove that line completely.

```code
[...]
    "java",
[...]
```

```code
[...]
    //"java",
[...]
```

## Contribution & License

This Template is licensed under MIT Licens, a copy of it is contained in this Repository.

If you want to contribute to this repository, feel free to grab a fork and submit a pull request.

Also see Projects and Issues section for details about current bugs, todos, etc.

## Footnotes

### PHP

[1]: Since the compiled script will be executed in the CLI, you will need a proper installation of PHP in your PATH. Also you will need the PHP extension for VSCode.

### external Software Needed

[2]: the Taget is not supported to be run without thirdparty software, so it won't open.
