AFRAME.registerComponent("bullets",{
    init:function(){
        this.shootBullet()

    },
    shootBullet:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key==='z'){
                var bullet=document.createElement("a-entity")
                bullet.setAttribute('gltf-model',"#ball")
                bullet.setAttribute('scale',"4 4 4")
                bullet.setAttribute("material","color","black")
                bullet.setAttribute("dynamic-body", { shape: "sphere", sphereRadius: 0.5, mass: 50 })
                bullet.addEventListener("collide", this.removeBullet)
                var cam = document.querySelector("#camera")
                pos=cam.getAttribute("position")
                pos1=pos.y-0.8
                bullet.setAttribute("position",{
                    x:pos.x,
                    y:pos1,
                    z:pos.z
                })
                var cam=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                cam.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")
                scene.appendChild(bullet)
            }
        })
    },
    removeBullet: function (e) {
        // console.log(e.detail.target.el)
        // console.log(e.detail.body.el)
        var element = e.detail.target.el
        var elementHit = e.detail.body.el
        if (elementHit.id.includes("pin")) {
            elementHit.setAttribute("material", {
                opacity: 0,
                transparent: true
            })
            var impulse = new CANNON.Vec3(0,1,-15)
            var worldPoint = new CANNON.Vec3().copy(
                elementHit.getAttribute("position")
            )
            elementHit.body.applyImpulse(impulse, worldPoint)
            element.removeEventListener("collide", this.removeBullet)
            
            setTimeout(function(){
                var scene = document.querySelector("#pinball")
                scene.removeChild(elementHit)
                var scene = document.querySelector("#scene")
                scene.removeChild(element)
            },5000)
            
        }

    }
})