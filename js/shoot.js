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
    }
})