//bmerve merve bilgi 29117
/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer; // MeshDrawer object
        this.trs = trs;               // TRS object
        this.parent = parent;         // Parent node
        this.children = [];           // Array of child nodes

        if (parent) {
            parent.children.push(this); // Add this node to parent's children
        }
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
                /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        // Calculate the updated model matrix for the current node
        var localModelMatrix = this.trs.getTransformationMatrix(); // Get the local transformation matrix
        var worldModelMatrix = MatrixMult(modelMatrix, localModelMatrix); // Combine with parent's model matrix
    
        // Update the ModelView matrix
        var updatedModelView = MatrixMult(modelView, localModelMatrix);
    
        // Update the Normal Matrix
        var updatedNormalMatrix = getNormalMatrix(updatedModelView);
    
        // Update the MVP matrix
        var updatedMvp = MatrixMult(mvp, localModelMatrix);
    
        // Draw the MeshDrawer if it exists
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvp, updatedModelView, updatedNormalMatrix, worldModelMatrix);
        }
    
        // Recursively call draw on child nodes
        for (let child of this.children) {
            child.draw(updatedMvp, updatedModelView, updatedNormalMatrix, worldModelMatrix);
        }
    }
    
}


    

