# React-Dnd
React beautiful drag and drop project with conditon
Main files are App.js,column.js,task.js,initialData.js problem I'm facing in isDropDisabled = true after putting task in progress column when :- const isDropDisabled = index < this.state.homeIndex; here homeindex becomes 1 when comes in done section and then isDropDisabled turns to be true and the code stops; so how to describe it and how to stop isDropDisabled to be false so that the task can be passed to done section!!
