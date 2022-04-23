"""The setup script."""

import os
from os.path import join

from setuptools import setup

install_requirements = [
    'flask',
    'flask_cors',
    'python-dotenv',
    'pycoingecko',
    'pandas'
]

# Required to run setup.py:
setup_requirements = ['pytest-runner', ]

test_requirements = [
    'pytest',
]


packages = []
for d, _, _ in os.walk('backtester'):
    if os.path.exists(join(d, '__init__.py')):
        packages.append(d.replace(os.path.sep, '.'))

setup(
    author="eth-amsterdam-geeks",
    author_email='eth-amsterdam@geeks.com',
    classifiers=[
        'Natural Language :: English',
        'Programming Language :: Python :: 3.8',
    ],
    description="",
    extras_require={
        'test': test_requirements
    },
    install_requires=install_requirements,
    license="Apache Software License 2.0",
    long_description='',
    long_description_content_type="text/markdown",
    include_package_data=True,
    keywords='backtester',
    name='backtester',
    packages=packages,
    setup_requires=setup_requirements,
    test_suite='tests',
    tests_require=test_requirements,
    version=0.1,
    zip_safe=False,
)