function LinkedList(){
    var length = 0;
    var head = null;

    var Node = function(el){
        this.el = el;
        this.next = null;
    };

    this.size = function(){
        return length;
    };

    this.head = function(){
        return head;
    };

    this.add = function(el){
        var node = new Node(el);
        if(head === null){
            head = node;
        } else {
            var currentNode = head;
        
            while(currentNode.next){
                currentNode = currentNode.next;
            }

            currentNode.next = node;
        }
         length++;
    };

    this.remove = function(el){
        var currentNode = head;
        var prevNode;
        if(currentNode.el === el){
            head = currentNode.next;
        } else {
            while(currentNode.el !== el){
                prevNode = currentNode;
                currentNode = currentNode.next;
            }

            prevNode.next = currentNode.next;
        }
        length--;
    };

    this.isEmpty = function(){
        return length === 0;
    };

    this.indexOf = function(el){
        var currentNode = head;
        var index = -1;

        while(currentNode){
            index++;
            if(currentNode.el === el){
                return index;
            }
            currentNode = currentNode.next;
        }
        return -1;
    };

    this.elementAt = function(index){
        var currentNode = head;
        var count = 0;
        while (count < index){
            count++;
            currentNode = currentNode.next;
        }
        return currentNode.el;
    };

    this.addAt = function(index, el){
        var node = new Node(el);

        var currentNode = head;
        var prevNode;
        var currentIndex = 0;
    
        if (index > length){
            return false;
        }

        if (index === 0){
            node.next = currentNode;
            head = node;
        } else {
            while (currentIndex < index){
                currentIndex++;
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            node.next = currentNode;
            prevNode.next = node;
        }
    length++;
}

    this.removeAt = function(index){
        var currentNode = head;
        var prevNode;
        var currentIndex = 0;
        if (index < 0 || index >= length){
            return null;
        }
        if (index === 0){
            head = currentNode.next;
        } else {
            while (currentIndex < index){
                currentIndex++;
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            prevNode.next = currentNode.next;
        }
        length--;
        return currentNode.el;
    }
}

var conga = new LinkedList();
conga.add('Kitten');
conga.add('Puppy');
conga.add('Dog');
conga.add('Cat');
conga.add('Fish');

console.log(conga.size());
console.log(conga.removeAt(3));
console.log(conga.elementAt(3));
console.log(conga.indexOf('Puppy'));
console.log(conga.size());