function Async(fn, fn2){
    var prom = {
      delay: function(millisecond){//Async.delay(3000).then(function(){ Do something important })
      
      },
      qeue: {
        stack: [],
        add: function(cb){
          this.stack.push(cb);
          return this;
        },
        pop: function(){},
        chop: function(){},
        remove: function(cb){
          this.stack.forEach(function(_cb, index){
            if (cb == _cb || cb.name == _cb.name) {
              this.stack.splice(index, 1);
            }
          }, this);
          return this;
        },
        triggerAll: function(){
          while(this.stack.length > 0){
            this.trigger();
          }
        },
        trigger: function(){
          var nextCb ;
          if (!(nextCb = this.stack.shift())) {
            return null;
          }
            nextCb.call(this);
        }
      },
      then: function(success, failed){
        // You can make for inifite thening by working up the cb and using it to constitute another promise.resolve that can be chained
        // How: work up current task and call resolve with the result or reject with the failure
        prom.successful ? function(){
          success(prom.successStory);
          // Prevent .then being fired the second time prom.resolved = prom.fulfilled = true
        }: function(){
          if(typeof failed === "function"){
            failed(prom.failureStory);
            // Prevent .catch fireing if failed was called prom.cought = true;
          }
        }; 
        return this;
      },
      catch: function(fn){
        if (prom.cought == false) {
          fn(prom.catched); //Run only if it has not been yet cought
        }
        return prom;
      },
      finally: function(fn){
        return fn(prom.value);
      },
      resolve: function(value){
        try{
          prom.value = value;
        } catch(error){
          
        }
      },
      reject: function(fn){
        fn.call(prom, prom.catched);
      }
    };

    try{
    fn.call(prom, fn, fn2);
    }catch(error){
      prom.catched = error;
    }
    return prom;
  }