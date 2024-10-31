## Branching strategy

There will be a `main` branch and feature branches:
* `main`: The code on `main` will remain runnable at all times. No commits will be made directly to `main`. 
* feature branches: Will be named `<issue n.>-descriptive-name`. An issue will be created per branch. A valid branch name would be `11-drag-and-drop` where #11 is the issue number of the related issue.

Code from feature branches shall be added to `main` through the following process:
1. Merge `main` into the feature branch.
2. Solve conflicts at the feature branch.
3. Create a pull request from the feature branch into main.
4. Once the pull request is reviewed and **approved by another member**, it may be merged into `main`.

## Commit policy

Commits should represent a single self-contained change. The objective is to make the commit, and the commit history a good self-explanatory reference of the state of the repository. A good commit helps understand when and why changes where made. 

The following template (based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)) will be used for commits:

```
<type>: <title> (72 char limit)

[optional body] (line wrap at 72 char)

[optional footer(s)]
```

Allowed `<type>` values:
* `feat` (new functionality)
* `fix` (bug fix)
* `docs` (documentation)
* `style` (formatting without functional changes)
* `refactor` (refactored code that neither fixes a bug nor adds a feature)
* `test` (adding or modifing tests)
* `chore` (configuration changes, updating dependencies, etc.)

`<title>` Should be written in imperative and be capitalized (eg. Add, Fix, Change, rather than Added/Adds, Fixed/Fixes, Changed/Changes)

`[optional body]` Should be a description of **why** the change was made, not **how**.

`[optional footer(s)]` may include:
* Commit co-authors: `Co-authored-by: username <name@example.COM>`

### Examples
Some examples of good commits:

`chore: Update gitignore`

`fix: Resolve null pointer exception in data processing`

`docs: Update installation guide for Windows users`

`feat: Add chess engine to board`

Some examples of bad commits:

`aaaa`

`Error git fix`

`Drag_and_drop`

## Coding standards

Follow [C#](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names) and [Unity](https://unity.com/how-to/naming-and-code-style-tips-c-scripting-unity) recommendations.

Mainly:

### Identifier names

* Use meaningful and descriptive names for variables, methods, and classes.

* Prefer clarity over brevity. Avoid using single-letter names, except for simple loop counters.

* Use PascalCase for class names and method names.

* Use camelCase for method arguments, local variables, and private fields.

* Use PascalCase for constant names, both fields and local constants.

* Private instance fields start with an underscore (_) to differentiate them from local variables.

* Interface names start with a capital I.

* Prefix Booleans with a verb: These variables indicate a true or false value. Often they are the answer to a question, such as: Is the player running? Is the game over?

    * Prefix them with a verb to make their meaning more apparent. Often this is paired with a description or condition, e.g., isDead, isWalking, hasDamageMultiplier, etc.

* Use pascal case for enum names and values. You can place public enums outside of a class to make them global. Use a singular noun for the enum name.

### Styling
* Use four spaces for indentation.
* Align code consistently to improve readability.
* Break long statements into multiple lines to improve clarity.
* Use the "Allman" style for braces: open and closing brace its own new line. Braces line up with current indentation level.
* Line breaks should occur before binary operators, if necessary.

### Sample code
```
using System;

namespace GameNamespace
{
    public interface IGameState
    {
        void StartGame();
        void DamagePlayer(int playerHealth);
    }

... 

    public class GameController : IGameState
    {
        public GameState CurrentState;

        private bool _isGameOver;
        private int _playerHealth;

        public enum GameState
        {
            Playing,
            Paused,
            GameOver
        }

        public void DamagePlayer(int damageAmount)
        {
            _playerHealth -= damageAmount;

            if (_playerHealth <= 0)
            {
                _isGameOver = true;
            }
        }
    }
}
```