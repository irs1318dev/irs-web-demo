# Miniconda must be installed before running this setup script.
#
# WINDOWS
#========
# Run this script from an Anaconda Powershell prompt, using the base
# Anaconda environment.
# Command: 
# .\conda-setup.ps1
#
# MAC AND LINUX
# =============
# Run this command from Terminal.
# Command:
# source conda-setup.ps1
#
# Manual Installation
# ===================
# Alternatively, you can type or paste each command into
# your terminal program and run them manually.
#
# Note on install Options
# =======================
# The `-y` options bypasses the conda's yes/no
# confirmation that normally occcurs when you try to install a packae.
# The `-c` option allows us to download the package from an alternate
# package repository called conda-forge. Conda Forge often has more
# current versions of packages. Without the `-c` switch, the packages
# will be downloaded from the default repository provied by Anaconda,
# which is the company that makes Miniconda, our Python distribution.

# Create the new environment
conda deactivate
conda create -y --name iss22 python=3.9

# Activate the environment and install packages.
conda activate iss22
conda install -y -c conda-forge nodejs=17.1.0
conda install -y -c conda-forge jupyterlab=3.2.5
conda install -y -c conda-forge flask=2.0.2
conda install -y -c conda-forge flask-socketio=5.1.1
conda install -y -c conda-forge eventlet=0.33.0

# These packages are not used in the demo, but will be used in the
# Scouting system.
conda install -y pandas=1.3.4
conda install -y bokeh=2.4.2
conda install -y jupyter_bokeh=3.0.4
conda install -y pytest=6.2.4
