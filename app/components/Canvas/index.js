import { Box, Camera, Mesh, Program, Renderer, Transform } from 'ogl'

export default class Canvas {
  constructor() {
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createCube()
  }

  createRenderer() {
    this.renderer = new Renderer()

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 8
  }

  createScene() {
    this.scene = new Transform()
  }

  createCube() {
    this.geometry = new Box(this.gl)

    this.program = new Program(this.gl, {
      vertex: `
            attribute vec2 uv;
            attribute vec2 position;

            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = vec4(position, 0, 1);
            }
        `,
      fragment: `
            precision highp float;

            uniform float uTime;

            varying vec2 vUv;

            void main() {
                gl_FragColor.rgb = vec3(0.8, 0.7, 1.0) + 0.3 * cos(vUv.xyx + uTime);
                gl_FragColor.a = 1.0;
            }
        `,
      uniforms: {
        uTime: { value: 0 },
      },
    })

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.setParent(this.scene)
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    })
  }

  update() {
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.01

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    })
  }
}
